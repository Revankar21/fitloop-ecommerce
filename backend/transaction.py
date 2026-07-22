@payment_bp.route("/payment/create", methods=["POST"])
def create_transaction():

    data = request.get_json()

    amount = str(data["amount"])

    customer_id = data["customer_id"]

    order_id = str(uuid.uuid4())

    body = {
        "requestType": "Payment",
        "mid": PAYTM_MID,
        "websiteName": PAYTM_WEBSITE,
        "orderId": order_id,
        "callbackUrl": PAYTM_CALLBACK_URL,
        "txnAmount": {
            "value": amount,
            "currency": "INR"
        },
        "userInfo": {
            "custId": customer_id
        }
    }

    checksum = PaytmChecksum.generateSignature(
        json.dumps(body),
        PAYTM_MERCHANT_KEY
    )

    payload = {
        "body": body,
        "head": {
            "signature": checksum
        }
    }

    url = f"{PAYTM_INITIATE_URL}?mid={PAYTM_MID}&orderId={order_id}"

    response = requests.post(url, json=payload)

    return jsonify(response.json())
