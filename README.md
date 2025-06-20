# Fitloop Next.js E-commerce

This is a simple e-commerce web application built with Next.js, MongoDB, and Stripe for payments.

## Features
- User authentication (signup, login, logout)
- Admin panel for managing users
- Product listing and cart functionality
- Secure checkout with Stripe

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- Yarn or npm
- MongoDB (local or cloud)

### Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd fitloop-next
   ```
2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fitloop
   JWT_SECRET=your_jwt_secret
   ```
4. Start MongoDB (if running locally):
   ```bash
   brew services start mongodb/brew/mongodb-community
   # or use your preferred method
   ```
5. Initialize the admin user:
   ```bash
   yarn init-admin
   ```
6. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## License
This project is for educational purposes. 