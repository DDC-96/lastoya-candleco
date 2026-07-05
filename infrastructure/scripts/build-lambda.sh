#!/usr/bin/env bash
# Builds the Lambda deployment package: pip installs dependencies for the Linux
# x86_64 runtime, then copies the handler source on top.
#
# Called by Terraform's external data source — reads JSON from stdin, prints JSON.
# Also safe to call directly: ./build-lambda.sh
#
# Outputs a single shared zip used by all five Lambda functions.
# Each function declares its own handler path, so one zip covers all of them.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# When called by Terraform external data source, read build_dir from stdin JSON.
# When called directly, derive paths relative to repo root.
if [ -t 0 ]; then
  # Direct invocation
  BUILD_DIR="$REPO_ROOT/infrastructure/terraform/environments/dev/.lambda_builds/package"
else
  # Called by Terraform: read query JSON from stdin
  QUERY=$(cat)
  BUILD_DIR=$(echo "$QUERY" | python3 -c "import sys,json; print(json.load(sys.stdin)['build_dir'])")
fi

SOURCE_DIR="$REPO_ROOT/backend"

echo "→ Cleaning build dir: $BUILD_DIR" >&2
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

PIP=$(command -v pip3 || command -v pip)

echo "→ Installing Python dependencies (Linux x86_64 runtime)" >&2
"$PIP" install \
  --quiet \
  --requirement "$SOURCE_DIR/requirements.txt" \
  --target "$BUILD_DIR" \
  --platform manylinux2014_x86_64 \
  --implementation cp \
  --python-version 3.12 \
  --only-binary :all:

echo "→ Copying handler source" >&2
cp -r "$SOURCE_DIR/src/." "$BUILD_DIR/"

# Hash the build dir contents so Terraform knows when to redeploy.
HASH=$(find "$BUILD_DIR" -type f | sort | xargs python3 -c "
import sys, hashlib
h = hashlib.md5()
for path in sys.stdin.read().splitlines():
    with open(path, 'rb') as f:
        h.update(f.read())
print(h.hexdigest())
")

echo "→ Build complete (hash: $HASH)" >&2

# Terraform external data source requires a JSON object on stdout.
echo "{\"hash\": \"$HASH\"}"
