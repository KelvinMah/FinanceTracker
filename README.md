# FinanceTracker
A full-stack web application to help users manage their personal finances by tracking income, expenses, and spending categories. Built with **Java Spring Boot**, **PostgreSQL**, and **React**.

---

## 🛠 Tech Stack

**Backend**
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- JUnit 5 (Testing)

**Frontend**
- React.js
- Axios
- CSS (with utility classes like Tailwind-style)
- Create React App

**DevOps**
- GitHub Actions (CI/CD with PostgreSQL service)

---

## ✨ Features

- Add, update, and delete financial transactions
- Track income and expenses by category and date
- View a list of all transactions
- RESTful API with JSON support
- Full backend unit tests
- CI/CD pipeline with GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- PostgreSQL installed (or use Docker)
- Node.js and npm (for frontend)

---

## 📦 Backend Setup

1. **Clone the repository** and open the `finance-tracker-backend` in IntelliJ.
2. Create a PostgreSQL database named `finance_db`.
3. Update credentials in `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/finance_db
    username: your_user
    password: your_pass
