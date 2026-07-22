import os

PAYTM_MID = os.getenv("PAYTM_MID")
PAYTM_MERCHANT_KEY = os.getenv("PAYTM_MERCHANT_KEY")

PAYTM_WEBSITE = "WEBSTAGING"
PAYTM_CALLBACK_URL = "http://localhost:5000/payment/callback"

PAYTM_INITIATE_URL = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction"
PAYTM_STATUS_URL = "https://securegw-stage.paytm.in/v3/order/status"
