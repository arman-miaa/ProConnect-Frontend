

# 🚀 **ProConnect: Freelance/Service Marketplace Blueprint**

ProConnect is a two-sided service marketplace where **Sellers/Providers** offer services and **Clients/Buyers** purchase them.
An Admin oversees the entire platform, manages verification, and controls commission-based earnings.

---

## 1. 🌟 Project Name & Core Concept

* **Project Name:** **ProConnect**
* **Concept:** A modern service marketplace connecting clients with professional sellers.
  The platform includes a **built-in messaging system** that allows users to communicate before or after placing an order.

---

## 2. 👤 User Types & Roles

| Role       | Primary Actions                                                       | Additional Capabilities                                      |
| ---------- | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Client** | Browse services, place orders, leave ratings & reviews                | Manage profile, view order history, chat with sellers        |
| **Seller** | Create/update services, accept/cancel orders, request withdrawals     | Access earnings dashboard, manage profile, chat with clients |
| **Admin**  | Manage users/services/orders, verify sellers, configure payments/fees | Access global analytics, platform moderation                 |

---

## 3. 🗄️ Data Modeling

### **3.1 User Model**

| Field            | Type    | Relevance    | Description                   |
| ---------------- | ------- | ------------ | ----------------------------- |
| `name`           | String  | All          | Full name                     |
| `email`          | String  | All          | Login/registration            |
| `password`       | String  | All          | Hashed password               |
| `role`           | String  | All          | `CLIENT` / `SELLER` / `ADMIN` |
| `isVerified`     | Boolean | Seller/Admin | Verification status           |
| `location`       | String  | All          | User location                 |
| `bio`            | String  | All          | Profile description           |
| `skills`         | Array   | Seller       | Seller skills                 |
| `profilePicture` | String  | All          | Cloudinary URL                |
| `averageRating`  | Number  | All          | Average rating received       |

---

### **3.2 Service Model**

| Field           | Type     | Role   | Description                       |
| --------------- | -------- | ------ | --------------------------------- |
| `sellerId`      | ObjectId | Seller | Service provider                  |
| `title`         | String   | Seller | Service name                      |
| `description`   | String   | Seller | Detailed description              |
| `price`         | Number   | Seller | Base price                        |
| `deliveryTime`  | Number   | Seller | Delivery timeline (in days/hours) |
| `category`      | String   | All    | Service category                  |
| `images`        | Array    | Seller | Service showcase images           |
| `averageRating` | Number   | All    | Aggregate service rating          |

---

### **3.3 Order Model**

| Field             | Type     | Role | Description                                                        |
| ----------------- | -------- | ---- | ------------------------------------------------------------------ |
| `serviceId`       | ObjectId | All  | Purchased service                                                  |
| `buyerId`         | ObjectId | All  | Client placing the order                                           |
| `sellerId`        | ObjectId | All  | Service provider                                                   |
| `totalPrice`      | Number   | All  | Final payable amount                                               |
| `platformFee`     | Number   | All  | Marketplace commission                                             |
| `sellerEarnings`  | Number   | All  | Amount receivable by the seller                                    |
| `status`          | String   | All  | `PENDING` / `ACCEPTED` / `IN_PROGRESS` / `COMPLETED` / `CANCELLED` |
| `paymentIntentId` | String   | All  | Stripe/SSLCommerz payment reference                                |

---

### **3.4 Review Model**

| Field            | Type     | Role   | Description            |
| ---------------- | -------- | ------ | ---------------------- |
| `orderId`        | ObjectId | Client | Review linked to order |
| `serviceId`      | ObjectId | Client | Reviewed service       |
| `reviewerId`     | ObjectId | Client | Client giving review   |
| `reviewedUserId` | ObjectId | Client | Seller being reviewed  |
| `rating`         | Number   | Client | 1–5 stars              |
| `comment`        | String   | Client | Review content         |

---

### **3.5 Transaction / Withdrawal Model**

| Field      | Type     | Role   | Description                            |
| ---------- | -------- | ------ | -------------------------------------- |
| `sellerId` | ObjectId | Seller | Seller requesting withdrawal           |
| `amount`   | Number   | Seller | Requested payout amount                |
| `status`   | String   | Admin  | `PENDING` / `APPROVED` / `REJECTED`    |
| `method`   | String   | Seller | Payment withdrawal method (Bank/Bkash) |

---

### **3.6 Message Model (New!)**

| Field        | Type     | Role | Description                |
| ------------ | -------- | ---- | -------------------------- |
| `senderId`   | ObjectId | All  | Message sender             |
| `receiverId` | ObjectId | All  | Message receiver           |
| `orderId`    | ObjectId | Opt. | Linked to a specific order |
| `content`    | String   | All  | Message text               |
| `read`       | Boolean  | All  | Read/unread status         |
| `createdAt`  | Date     | All  | Timestamp                  |

---

## 4. 🌐 API Endpoints

| Role        | Method | Endpoint                      | Description            | Security      |
| ----------- | ------ | ----------------------------- | ---------------------- | ------------- |
| **Auth**    | POST   | `/api/auth/register`          | Register new users     | Public        |
| **Auth**    | POST   | `/api/auth/login`             | Login + JWT cookies    | Public        |
| **Service** | POST   | `/api/services`               | Create a service       | Seller Only   |
| **Service** | GET    | `/api/services`               | List all services      | Public        |
| **Service** | GET    | `/api/services/:id`           | Get service details    | Public        |
| **Service** | PATCH  | `/api/services/:id`           | Update a service       | Seller Only   |
| **Order**   | POST   | `/api/orders`                 | Place an order         | Client Only   |
| **Order**   | GET    | `/api/orders/seller`          | View seller orders     | Seller Only   |
| **Order**   | PATCH  | `/api/orders/:id`             | Update order status    | Seller Only   |
| **Payment** | POST   | `/api/payments/create-intent` | Create payment intent  | Client Only   |
| **Payment** | POST   | `/api/payments/webhook`       | Handle payment webhook | Public        |
| **Review**  | POST   | `/api/reviews`                | Add a review           | Client Only   |
| **Admin**   | GET    | `/api/admin/users`            | List all users         | Admin Only    |
| **Admin**   | PATCH  | `/api/admin/users/:id/verify` | Verify seller          | Admin Only    |
| **Message** | POST   | `/api/messages`               | Send a message         | Authenticated |
| **Message** | GET    | `/api/messages/:userId`       | Get messages           | Authenticated |
| **Message** | PATCH  | `/api/messages/:id/read`      | Mark as read           | Authenticated |

---


