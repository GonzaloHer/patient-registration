# Patient Registration App

This project includes a **React + TypeScript frontend** and a **Node.js (Express) backend** with a **PostgreSQL database**.

---

### 1. Repository

```bash
git clone https://github.com/your_user/patient_registration.git
cd patient_registration
```

---

### 2. Backend (`stack`)

#### Run with Docker

```bash
cd stack
cp .env.example .env
docker compose up --build
```

Additionally, we have a worker for sending emails:

```bash
npm run email-worker
```

Run it from the `stack` directory.

> The backend runs at: http://localhost:4000

---

On first launch, the following script `db/init.sql` is automatically executed to **create the `patients` table if it does not exist**:

```sql
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_country_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  document_photo TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 3. Frontend (`frontend`)

```bash
cd frontend
npm install
npm start
```

> The frontend runs at: http://localhost:3000

---

## ⚙️ Environment Variables

### stack/.env

```env
PORT=4000
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=patients_db

MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
REDIS_HOST=redis
REDIS_PORT=6379
```

### stack/.env.test

```env
PORT=4001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=patients_db
```
