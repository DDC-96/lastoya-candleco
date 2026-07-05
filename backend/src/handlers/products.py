import json
import os
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["PRODUCTS_TABLE"])


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    path_params = event.get("pathParameters") or {}
    product_id = path_params.get("id")

    try:
        if product_id:
            return _get_product(product_id)
        return _list_products()
    except Exception as e:
        return _error(500, str(e))


def _list_products():
    result = table.scan()
    return _ok(result.get("Items", []))


def _get_product(product_id):
    result = table.get_item(Key={"productId": product_id})
    item = result.get("Item")
    if not item:
        return _error(404, "Product not found")
    return _ok(item)


def _ok(data):
    return {"statusCode": 200, "headers": {"Content-Type": "application/json"}, "body": json.dumps(data, default=str)}


def _error(status, message):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps({"error": message})}
