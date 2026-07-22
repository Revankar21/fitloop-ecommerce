# FitLoop E-Commerce

FitLoop is a full-stack e-commerce web application built with **Flask**, **MongoDB**, and **Paytm Payment Gateway**. The application enables users to browse products, manage their shopping cart, place orders, and complete secure online payments. It also provides an admin panel for managing products, users, and orders.

---

## 🚀 Features

### Customer Features
- User registration and login
- Secure user authentication
- Browse and search products
- Product details page
- Shopping cart management
- Secure checkout using **Paytm Payment Gateway**
- Order placement and payment tracking
- Responsive user interface

### Admin Features
- Admin login
- Product management
- User management
- Order management
- Payment status monitoring

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| Backend | Flask (Python) |
| Frontend | HTML, CSS, JavaScript, Bootstrap |
| Database | MongoDB |
| Authentication | Flask Session / JWT |
| Payment Gateway | Paytm Payment Gateway |
| HTTP Requests | Requests Library |

---

## 📋 Prerequisites

Before running the project, install:

- Python 3.10 or later
- pip
- MongoDB (Local or MongoDB Atlas)
- Git
- Paytm Merchant Account (for payment integration)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Revankar21/fitloop-ecommerce.git
cd fitloop-ecommerce
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows**

```bash
venv\Scripts\activate
```

**Linux/macOS**

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
MONGODB_URI=mongodb://localhost:27017/fitloop

SECRET_KEY=your_secret_key

PAYTM_MID=your_paytm_merchant_id
PAYTM_MERCHANT_KEY=your_paytm_merchant_key

PAYTM_WEBSITE=WEBSTAGING
PAYTM_CALLBACK_URL=http://localhost:5000/payment/callback
```

Replace all placeholder values with your own credentials.

---

### 5. Start MongoDB

If using a local MongoDB server, start the MongoDB service before running the application.

---

### 6. Run the Application

```bash
python app.py
```

The application will start at:

```
http://localhost:5000
```

---

## 💳 Paytm Payment Integration

The project uses **Paytm Payment Gateway** for secure online transactions.

### Payment Workflow

```
Customer
    │
    ▼
Browse Products
    │
    ▼
Add Items to Cart
    │
    ▼
Proceed to Checkout
    │
    ▼
Flask Backend Creates Order
    │
    ▼
Send Payment Request to Paytm
    │
    ▼
Receive Transaction Token
    │
    ▼
Customer Completes Payment
    │
    ▼
Paytm Redirects to Callback URL
    │
    ▼
Verify Checksum
    │
    ▼
Verify Transaction Status
    │
    ▼
Update Order Status
    │
    ▼
Payment Successful
```

---

## 📂 Project Structure

```
fitloop-ecommerce/
│
├── app.py
├── config.py
├── requirements.txt
├── routes/
│   ├── auth.py
│   ├── products.py
│   ├── cart.py
│   ├── orders.py
│   └── payment.py
├── templates/
├── static/
├── models/
├── utils/
├── .env
└── README.md
```

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB database connection string |
| `SECRET_KEY` | Flask application secret key |
| `PAYTM_MID` | Paytm Merchant ID |
| `PAYTM_MERCHANT_KEY` | Paytm Merchant Key |
| `PAYTM_WEBSITE` | `WEBSTAGING` for testing, `DEFAULT` for production |
| `PAYTM_CALLBACK_URL` | Callback URL for payment response |

---

## ▶️ Running the Project

```bash
python app.py
```

Open your browser and visit:

```
http://localhost:5000
```

---

## 📌 Future Improvements

- Wishlist functionality
- Product reviews and ratings
- Coupon and discount system
- Email notifications
- Order history
- Inventory management
- Sales analytics dashboard

---

## 📄 License

This project is developed for **educational and learning purposes**. You are free to use and modify it for personal or academic projects.

---

## 👨‍💻 Author

**Revankar21**

GitHub: https://github.com/Revankar21
