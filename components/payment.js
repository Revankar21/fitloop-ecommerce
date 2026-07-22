async function payNow() {

    const res = await fetch("/payment/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: 1499,
            customer_id: "USER001"
        })
    });

    const data = await res.json();

    const token = data.body.txnToken;
    const orderId = data.body.orderId;

    window.Paytm.CheckoutJS.init({
        root: "",
        flow: "DEFAULT",
        data: {
            orderId,
            token,
            tokenType: "TXN_TOKEN",
            amount: "1499"
        }
    }).then(function () {
        window.Paytm.CheckoutJS.invoke();
    });
}
