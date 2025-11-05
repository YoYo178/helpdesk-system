# 🧾 Helpdesk System

A frontend-only **Helpdesk System design clone** built with React, TypeScript, Redux Toolkit, and Vite.  
This project was created as part of an assignment to replicate the UI and behavior of a helpdesk dashboard.

---

## ✨ Features

- 🔧 All styles written entirely from scratch — **no CSS frameworks** used.
- 👥 Role-based access control using **mock user accounts**.
- 🔐 Simple authentication simulation with hardcoded users.
- 🧩 Modular folder structure using best practices.

---

## 📁 Project Structure

```bash
src/
  app/            # Redux store and custom hooks
  components/     # Reusable UI components
  elements/       # Sidebar and layout elements
  features/       # Auth, ticket, and audit data (JSON-based)
  layouts/        # Route-based layout wrappers
  pages/          # Core pages (Dashboard, Login, Tickets, etc.)
  index.css       # Global styles
  main.tsx        # Entry point
```

## ⚙️ Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Run the development server**
   ```bash
   pnpm dev
   ```

3. **Build for production**
   ```bash
   pnpm build
   ```

4. **Preview the production build**
   ```bash
   pnpm preview
   ```

5. **Lint the code**
   ```bash
   pnpm lint
   ```

## 📝 Notes
- This is a static UI-only clone with no backend/API integration.
- The app uses a custom base path: `/helpdesk-system/` (see `vite.config.ts`).
- All roles and login credentials are visible on the login page.
- Forms, buttons, toggles, and dropdowns are for visual purposes only.

## 📄 License
- This project is for educational and demo purposes only.
- Not intended for production use.