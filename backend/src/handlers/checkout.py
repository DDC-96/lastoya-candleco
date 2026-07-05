import json
import os

# stripe imported at runtime — added to requirements.txt
# import stripe


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "POST")
    path = event.get("rawPath", "")

    try:
        body = json.loads(event.get("body") or "{}")
        if "/session" in path:
            return _create_session(body)
        return _error(404, "Not found")
    except Exception as e:
        return _error(500, str(e))


def _create_session(body):
    # TODO: initialise stripe with key from Doppler
    # stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
    # session = stripe.checkout.Session.create(
    #     payment_method_types=["card"],
    #     line_items=body.get("items", []),
    #     mode="payment",
    #     success_url=f"{os.environ['FRONTEND_URL']}/order/{{CHECKOUT_SESSION_ID}}",
    #     cancel_url=f"{os.environ['FRONTEND_URL']}/checkout",
    # )
    # return _ok({"sessionId": session.id, "url": session.url})

    return _ok({"message": "Stripe checkout stub — wire up after Stripe setup"})


def _ok(data, status=200):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps(data)}


def _error(status, message):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps({"error": message})}
