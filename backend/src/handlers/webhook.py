import json
import os
import boto3

# stripe imported at runtime — added to requirements.txt
# import stripe

dynamodb = boto3.resource("dynamodb")
orders_table = dynamodb.Table(os.environ["ORDERS_TABLE"])


def handler(event, context):
    try:
        payload = event.get("body") or ""
        sig_header = (event.get("headers") or {}).get("stripe-signature", "")

        # TODO: verify Stripe webhook signature once Stripe is wired up
        # stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
        # webhook_secret = os.environ["STRIPE_WEBHOOK_SECRET"]
        # stripe_event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)

        # Stub: parse payload directly
        stripe_event = json.loads(payload)
        event_type = stripe_event.get("type", "")

        if event_type == "checkout.session.completed":
            return _handle_checkout_completed(stripe_event["data"]["object"])

        return _ok({"received": True})
    except Exception as e:
        return _error(400, str(e))


def _handle_checkout_completed(session):
    order_id = session.get("metadata", {}).get("orderId")
    if order_id:
        orders_table.update_item(
            Key={"orderId": order_id},
            UpdateExpression="SET #s = :s, stripeSessionId = :sid",
            ExpressionAttributeNames={"#s": "status"},
            ExpressionAttributeValues={":s": "paid", ":sid": session.get("id")},
        )
    return _ok({"received": True})


def _ok(data):
    return {"statusCode": 200, "headers": {"Content-Type": "application/json"}, "body": json.dumps(data)}


def _error(status, message):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps({"error": message})}
