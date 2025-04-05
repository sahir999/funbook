# 📘 Funbook – A Social Media App

Funbook is a frontend-only social media application built using **React JS**. It mimics the core features of modern platforms like Facebook, focusing on routing, authentication, state management, and CRUD operations — all without a backend by using **LocalStorage**.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Mock login system with email/password
  - Data persisted via `localStorage`
  - Protected routes for authenticated users

- 🧭 **Routing**
  - `/login` – Login page
  - `/` – Home/Feed (protected)
  - `/profile` – User profile (protected)
  - `/post/new` – Create post (protected)

- 📝 **Posts & Interactions**
  - Create text/image posts (images stored in base64)
  - Like posts and show total likes
  - Add nested comments (reply to comments)
  - Edit/delete own posts and comments

- 🗃 **Pagination**
  - Posts displayed in batches (e.g., 10 per page)
  - "Next" and "Previous" navigation

- 🧠 **State Management**
  - Managed with **Context API**
  - All data (users, posts, comments, likes) stored and retrieved from `localStorage`

- 🎨 **UI/UX**
  - Responsive design with clean layout
  - Intuitive interface with clear action buttons
  - Profile management with avatar upload

- ⚠️ **Error Handling**
  - Invalid login check
  - Graceful image upload error handling

---

## 🛠️ Tech Stack

- **React JS** (with hooks and Context API)
- **React Router DOM**
- **Plain CSS**
- **LocalStorage** for persistence

---
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
