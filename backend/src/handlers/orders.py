import json
import os
import uuid
from datetime import datetime, timezone
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["ORDERS_TABLE"])


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    path_params = event.get("pathParameters") or {}
    order_id = path_params.get("id")

    try:
        if method == "POST":
            return _create_order(json.loads(event.get("body") or "{}"))
        if order_id:
            return _get_order(order_id)
        return _error(400, "Missing order ID")
    except Exception as e:
        return _error(500, str(e))


def _create_order(body):
    order_id = str(uuid.uuid4())
    order = {
        "orderId": order_id,
        "status": "pending",
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "contact": body.get("contact", {}),
        "shipping": body.get("shipping", {}),
        "items": body.get("items", []),
        "total": body.get("total", 0),
    }
    table.put_item(Item=order)
    return _ok(order, 201)


def _get_order(order_id):
    result = table.get_item(Key={"orderId": order_id})
    item = result.get("Item")
    if not item:
        return _error(404, "Order not found")
    return _ok(item)


def _ok(data, status=200):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps(data, default=str)}


def _error(status, message):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps({"error": message})}
