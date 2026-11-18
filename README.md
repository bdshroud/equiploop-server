# EquipLoop Server — Commercial Equipment Rental Platform API

Backend API service for **EquipLoop** (Programming Hero Assignment 9 — Category 003).

- **Live API Endpoint:** `https://api.equiploop.com/api` (Placeholder / Deployment Target)
- **Live Client URL:** `https://equiploop.vercel.app` (Placeholder / Deployment Target)

---

## 1. Project Purpose & Architecture

EquipLoop Server provides commercial-grade RESTful API endpoints for the equipment rental marketplace. It manages inventory cataloging, rental reservations, Stripe escrow checkouts, webhook settlement, and platform analytics.

### Architectural Directives
- **Zero Better Auth in Express:** Authentication verification is performed using **`jose`** to cryptographically verify JSON Web Tokens against the Next.js frontend JWKS public key endpoint (`/api/auth/jwks`).
- **Native MongoDB Driver:** Uses official `mongodb` client (no Mongoose overhead) connecting directly to the shared `equiploop` database.
- **Role-Based Access Control:** Custom Express middlewares (`verifyToken`, `verifyRenter`, `verifyOwner`, `verifyAdmin`) enforce strict authorization.
- **Automated Cron Jobs:** Hourly `node-cron` task automatically marks confirmed rentals as `"Completed"` once the rental end date passes.

---

## 2. Key Features

- **Strict JWT Verification (`jose`):** Remote JWKS verification checking signature, issuer, and audience.
- **Stripe Escrow Payments:** Automated Stripe Checkout sessions with verified webhooks and recording in the `payments` collection.
- **Server-Side Search & Filters:** MongoDB regex search by machinery name and location; filtering by category, rental type, availability, and price range.
- **Dynamic Analytics:** Aggregation pipelines across `users`, `equipment`, `bookings`, and `payments` for both Admin and Fleet Owners.
- **Automated Booking Lifecycle:** Scheduled cron job auto-completes overdue bookings.

---

## 3. NPM Packages Used

- `express` (^4.21.2) — Fast, unopinionated HTTP web framework
- `mongodb` (^6.13.0) — Official MongoDB native Node.js driver
- `jose` (^5.9.6) — Universal JSON Web Encryption (JWE) & JWT library for remote JWKS verification
- `stripe` (^17.7.0) — Stripe payment processing SDK
- `cors` (^2.8.5) — Cross-Origin Resource Sharing middleware
- `dotenv` (^16.4.7) — Environment variable management
- `node-cron` (^3.0.3) — Pure JavaScript task scheduler

---

## 4. Environment Variables

Create `.env` based on `.env.example`:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
DB_URI=mongodb://localhost:27017
DB_NAME=equiploop
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
```

---

## 5. Running Locally

```bash
# Install dependencies
npm install

# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start
```
