from paytmchecksum import PaytmChecksum
import requests
import json
import uuid

MID = "YOUR_MID"
MKEY = "YOUR_MERCHANT_KEY"

from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/create-payment", methods=["POST"])
def create_payment():

    order_id = str(uuid.uuid4())

    paytmParams = {
        "body": {
            "requestType": "Payment",
            "mid": MID,
            "websiteName": "WEBSTAGING",
            "orderId": order_id,
            "callbackUrl": "http://localhost:5000/paytm/callback",
            "txnAmount": {
                "value": "499.00",
                "currency": "INR"
            },
            "userInfo": {
                "custId": "CUST001"
            }
        }
    }

    checksum = PaytmChecksum.generateSignature(
        json.dumps(paytmParams["body"]),
        MKEY
    )

    paytmParams["head"] = {
        "signature": checksum
    }

    url = f"https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid={MID}&orderId={order_id}"

    response = requests.post(url, json=paytmParams)

    return jsonify(response.json())
