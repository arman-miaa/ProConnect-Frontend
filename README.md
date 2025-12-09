
# ✨ ProConnect Frontend

![Home Screenshot](./public/home.png)

**ProConnect** is a **modern, high-performance marketplace platform** designed to **connect service providers (Sellers) with service seekers (Clients)**.  
It is built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and features **role-based modular architecture**, ensuring a **smooth and optimized experience** for **Admins, Sellers, and Clients**.

This project emphasizes **scalability**, **responsiveness**, and **maintainability**, making it **ideal for real-world marketplaces**.


---

## 🔗 Live Demo & Source

| 🔗 Name                 | Type                | Link                                                               |
| ----------------------- | ------------------- | ------------------------------------------------------------------ |
| 🌐 **Live Application** | Frontend Deployment | [Frontend Demo](https://pro-connect-frontend.vercel.app)           |
| ⚡ **Backend API**       | Deployment          | [Backend Demo](https://pro-connect-backend.vercel.app)             |
| 💻 **Frontend Source**  | GitHub              | [Frontend Repo](https://github.com/arman-miaa/ProConnect-Frontend) |
| 🔧 **Backend Source**   | GitHub              | [Backend Repo](https://github.com/arman-miaa/ProConnect-Backend)   |

---

## 🚀 Core Tech Stack

| Icon | Tech                        | Version  | Description                      |
| ---- | --------------------------- | -------- | -------------------------------- |
| ⚡    | **Next.js & React**         | 16.0.7   | SSR, modern React features       |
| 🟦   | **TypeScript**              | 5.9.3    | Type safety & reliability        |
| 🎨   | **Tailwind CSS**            | 4.1.17   | Responsive, utility-first design |
| 🧩   | **Shadcn/ui & Radix UI**    | Latest   | Modular, accessible components| 
| 📡   | **Axios**                   | 1.13.2   | API requests                     |
| ✅    | **Zod**                     | 4.1.13   | Runtime validation & schemas     |
| 📊   | **Recharts & Lucide React** | Latest   | Charts & icons                   |
| 🎞️  | **Framer Motion**           | 12.23.25 | Animations & transitions         |
| 🔔   | **Sonner & SweetAlert2**    | Latest   | Notifications & alerts           |

---

## ✨ Key Features

### 🏠 Public & Marketing Pages (`(commonLayout)`)

* 🚀 **Homepage (`/`)**: Hero, Features, Stats, Testimonials, CTA
* 🔍 **Service Browsing**: `/services`, `/services/[id]`
* 🔑 **Auth Flow**: Login, Registration, Forget/Reset Password
* 💳 **Payment Status**: `/payment/success`, `/payment/fail`, `/payment/cancel`

### 🛠️ Role-Based Dashboards (`(dashboardLayout)`)

| Icon | Role    | Dashboard                         | Features                                                          |
| ---- | ------- | --------------------------------- | ----------------------------------------------------------------- |
| 👑   | Admin   | `/admin/dashboard`                | Users/Sellers/Admins management, Analytics, Transactions, Reports |
| 🛠️  | Seller  | `/seller/dashboard`               | Service CRUD, Earnings, Payment History, Reviews                  |
| 🛒   | Client  | `/client/dashboard`               | Track orders, Transaction history, Reviews                        |
| 🔒   | General | `/my-profile`, `/change-password` | Profile management, Change password                               |

### 💡 Additional Features

* 💬 Messaging between users
* 💰 Wallet & Withdrawal management
* ⭐ Review & Rating system
* 📈 Analytics & Dashboard charts
* 🛡️ JWT authentication & Role-based access

---

## 📂 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (commonLayout)/         # Public & Auth pages
│   ├── (dashboardLayout)/      # Role-based dashboards
│   ├── api/                    # API routes
│   └── globals.css             # Global styles
├── assets/                     # Icons, Images, Static media
├── components/                 # UI Components (auth, modules, shared, ui)
├── hooks/                      # Custom React hooks
├── lib/                        # Utilities & helpers
├── services/                   # API calls
├── types/                      # TS interfaces
└── zod/                        # Validation schemas
```

---

## ⚙️ Local Setup

### Prerequisites

* Node.js v18+
* pnpm or npm

### Installation

```bash
git clone https://github.com/arman-miaa/ProConnect-Frontend.git
cd ProConnect-Frontend
pnpm install
```

### Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL="https://pro-connect-backend.vercel.app/api/v1"
```

### Running Dev Server

```bash
pnpm run dev
```

Access: [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contributing

1. Fork & branch: `git checkout -b feature/my-feature`
2. Commit: `git commit -m 'feat: Add feature'`
3. Push & PR: `git push origin feature/my-feature`

---

## 👤 Author

**Arman Mia** – [GitHub](https://github.com/arman-miaa)

---

## 📄 License

**ISC License** – See `LICENSE` file

