@payment_bp.route("/payment/callback", methods=["POST"])
def callback():

    received_data = request.form.to_dict()

    checksum = received_data.pop("CHECKSUMHASH")

    valid = PaytmChecksum.verifySignature(
        received_data,
        PAYTM_MERCHANT_KEY,
        checksum
    )

    if not valid:
        return "Checksum Verification Failed", 400

    order_id = received_data["ORDERID"]

    # Verify from Paytm
    body = {
        "mid": PAYTM_MID,
        "orderId": order_id
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

    response = requests.post(
        PAYTM_STATUS_URL,
        json=payload
    )

    result = response.json()

    if result["body"]["resultInfo"]["resultStatus"] == "TXN_SUCCESS":

        # Update database
        # order.payment_status="Paid"
        # db.session.commit()

        return "Payment Successful"

    return "Payment Failed"
