<div align="center">

# 🎓 Artificial Guruji

**AI-Powered Exam Prep — Smarter, Faster, and Stress-Free**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📖 Overview

**Artificial Guruji** is a full-stack AI-powered Learning Management System (LMS) that generates personalized study materials in seconds. Students and educators can create customized courses, chapter notes, flashcards, quizzes, and more — all driven by Google's Gemini AI. With built-in authentication, subscription billing, and background job processing, it is production-ready out of the box.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered Course Generation** | Create complete courses with chapters and notes using Google Gemini AI |
| 📚 **Smart Study Materials** | Auto-generate flashcards, quizzes, and Q&A content per course |
| 🗓️ **Custom Learning Paths** | Organize courses by topic and difficulty level |
| ⚡ **Background Processing** | Async AI generation via Inngest — no waiting around |
| 🔐 **Secure Authentication** | Sign-up / sign-in powered by Clerk |
| 💳 **Subscription Billing** | Free, Pro ($9.99/mo), and Enterprise tiers via Stripe |
| 🌗 **Dark / Light Mode** | Fully themed UI with `next-themes` |
| 📱 **Responsive Design** | Mobile-first layout built with Tailwind CSS and Radix UI |

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org)** — App Router, server components, API routes
- **[React 18](https://react.dev)** — UI library
- **[TypeScript](https://www.typescriptlang.org)** — Type safety
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first styling
- **[Radix UI](https://www.radix-ui.com)** — Accessible, unstyled component primitives
- **[Framer Motion](https://www.framer.com/motion)** — Animations

### Backend & Data
- **[Drizzle ORM](https://orm.drizzle.team)** — Type-safe SQL query builder
- **[Neon Database](https://neon.tech)** — Serverless PostgreSQL
- **[Inngest](https://www.inngest.com)** — Durable background functions
- **[Google Generative AI (Gemini)](https://ai.google.dev)** — Course content generation

### Auth & Payments
- **[Clerk](https://clerk.com)** — Authentication and user management
- **[Stripe](https://stripe.com)** — Subscription payments

---

## 🗂️ Project Structure

```
lms/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Sign-in / sign-up pages (Clerk)
│   ├── api/                # API route handlers
│   ├── course/[courseId]/  # Course viewer
│   ├── create/             # AI course creation wizard
│   └── dashboard/          # User dashboard & upgrade page
├── components/
│   ├── Landing/            # Marketing page sections (Hero, Features, Pricing…)
│   ├── Course/             # Course viewer components
│   ├── Dashboard/          # Dashboard components
│   └── ui/                 # Shared UI primitives
├── config/
│   ├── AiModel.ts          # Google Gemini client setup
│   ├── db.ts               # Drizzle + Neon database client
│   └── schema.ts           # Database schema definitions
├── inngest/
│   ├── client.ts           # Inngest client
│   └── function.ts         # Background job definitions
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── Types/                  # Shared TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm**, or **bun**
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) application
- A [Google AI Studio](https://aistudio.google.com) API key
- A [Stripe](https://stripe.com) account
- An [Inngest](https://www.inngest.com) account (or use the local dev server)

### 1. Clone the repository

```bash
git clone https://github.com/MohitGoyal09/lms.git
cd lms
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file at the root and add the following variables:

```env
# Database (Neon PostgreSQL)
NEXT_PUBLIC_DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=

# Stripe Payments
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

### 4. Push the database schema

```bash
npx drizzle-kit push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Tip:** To process background AI generation jobs locally, run the [Inngest Dev Server](https://www.inngest.com/docs/local-development) alongside the Next.js dev server:
> ```bash
> npx inngest-cli@latest dev
> ```

---

## 💲 Pricing Tiers

| Plan | Price | Highlights |
|---|---|---|
| **Free** | $0 / month | 3 AI-generated courses per month, community access, email support |
| **Pro** | $9.99 / month | Unlimited courses, advanced AI customization, custom learning paths, progress tracking, downloadable resources, priority support |
| **Enterprise** | Custom | Everything in Pro + custom AI model training, team collaboration, advanced analytics, API access, dedicated support |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx drizzle-kit push` | Push schema changes to the database |
| `npx drizzle-kit studio` | Open Drizzle Studio (DB GUI) |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/MohitGoyal09">Mohit Goyal</a>
</div>
