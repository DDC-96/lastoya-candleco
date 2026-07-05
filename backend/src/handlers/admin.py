import json
import os
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["ORDERS_TABLE"])

VALID_STATUSES = {"pending", "processing", "shipped", "delivered", "cancelled"}
ADMIN_SECRET = os.environ.get("ADMIN_SECRET", "")


def handler(event, context):
    # Verify admin secret header
    headers = event.get("headers") or {}
    if headers.get("x-admin-secret") != ADMIN_SECRET:
        return _error(401, "Unauthorized")

    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    path_params = event.get("pathParameters") or {}
    order_id = path_params.get("id")

    try:
        if method == "PATCH" and order_id:
            body = json.loads(event.get("body") or "{}")
            return _update_order_status(order_id, body)
        return _list_orders()
    except Exception as e:
        return _error(500, str(e))


def _list_orders():
    result = table.scan()
    items = sorted(result.get("Items", []), key=lambda x: x.get("createdAt", ""), reverse=True)
    return _ok(items)


def _update_order_status(order_id, body):
    new_status = body.get("status")
    if new_status not in VALID_STATUSES:
        return _error(400, f"Invalid status. Must be one of: {', '.join(VALID_STATUSES)}")

    result = table.update_item(
        Key={"orderId": order_id},
        UpdateExpression="SET #s = :s",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={":s": new_status},
        ReturnValues="ALL_NEW",
    )
    return _ok(result.get("Attributes", {}))


def _ok(data, status=200):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps(data, default=str)}


def _error(status, message):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps({"error": message})}
