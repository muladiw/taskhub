# Task Hub App

## Introduction

Hi 👋, my name is **Muladi Wahyudin**.  
I’m developing **Task Hub**, a simple application to manage tasks with support for **Web** and **Mobile** platforms.

The app is built using **Go Fiber**, **Next.js**, and **Flutter** with carefully chosen libraries to ensure efficiency, security, and a smooth user experience.

---

## Tech Stack

### Backend (API - Golang with Fiber)

- **[Fiber](https://gofiber.io/)** – A fast, lightweight web framework built on top of Fasthttp. I chose Fiber because it provides a simple Express-like API while delivering excellent performance for building RESTful APIs.
- **[golang-jwt](https://github.com/golang-jwt/jwt)** – Handles JWT generation and validation for authentication. This ensures secure user sessions and API protection.
- **[godotenv](https://github.com/joho/godotenv)** – Loads environment variables from a `.env` file, making it easy to manage configurations without hardcoding secrets.
- **[validator](https://github.com/go-playground/validator)** – Provides powerful payload validation, reducing boilerplate checks and ensuring request integrity.
- **[GORM](https://gorm.io/)** – An ORM that simplifies database interactions. It helps me write queries in Go code while still supporting complex SQL operations.

---

### Web (Next.js)

- **[React Query](https://tanstack.com/query/latest)** – Chosen for its powerful caching and background data synchronization. It makes API calls more efficient and keeps the UI up-to-date automatically.
- **[Hero UI](https://heroui.com/)** – A customizable UI library that speeds up development with pre-built interactive components, while still allowing flexibility for custom designs.
- **[Lucide React](https://lucide.dev/)** – A lightweight and customizable icon library. Icons are an essential part of a task management app for better UX, and Lucide provides a modern, scalable solution.
- **[React Hook Form](https://react-hook-form.com/)** – Efficient form state management with minimal re-renders, which improves performance in complex forms.
- **[Zod](https://zod.dev/)** – Used with React Hook Form for schema validation. It ensures form data is validated against strict rules before being submitted, reducing errors early.

---

### Mobile (Flutter)

- **[provider](https://pub.dev/packages/provider)** – Chosen for state management. It simplifies data sharing across widgets, making the app easier to maintain and reducing boilerplate code compared to manual `setState`.
- **[flutter_secure_storage](https://pub.dev/packages/flutter_secure_storage)** – Stores tokens and session data securely, which is crucial for authentication in mobile apps.
- **[flutter_svg](https://pub.dev/packages/flutter_svg)** – Enables rendering of SVG assets as widgets, making the UI more scalable and consistent across devices.
- **[http](https://pub.dev/packages/http)** – Simple yet effective library for making RESTful API calls to the backend.
- **[flutter_dotenv](https://pub.dev/packages/flutter_dotenv)** – Manages environment variables for different build environments (dev, staging, prod), making the app more maintainable.

---

## Environment Setup

### API (`api/.env`)

```env
PORT=YOUR_API_PORT
DB_HOST=YOUR_POSTGRE_HOST
DB_USERNAME=YOUR_POSTGRE_USERNAME
DB_PASSWORD=YOUR_POSTGRE_PASSWORD
DB_NAME=YOUR_POSTGRE_DB_NAME
DB_PORT=YOUR_POSTGRE_PORT
ACCESS_TOKEN_KEY=ACCESS_TOKEN_KEY
REFRESH_TOKEN_KEY=ACCESS_TOKEN_KEY
```

### WEB (`web/.env`)

```env
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

### MOBILE (`mobile/.env`)

```env
API_URL=http://10.137.43.200:8000
```

## Migration Database

### API (Golang)

```bash
cd api
go run cmd/migration/main.go
```

## Running the App

### API (Golang)

```bash
cd api
go run cmd/web/main.go
```

### WEB (NEXTJS)

```bash
cd web
npm run dev
```

### MOBILE (FLUTTER)

```bash
cd mobile
flutter run
```
