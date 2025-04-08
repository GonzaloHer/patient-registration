# Patient Registration App

Aplicación fullstack para registrar pacientes con foto de documento. Incluye frontend en React + TypeScript y backend en Node.js (Express) con persistencia en PostgreSQL.

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/patient_registration.git
cd patient_registration
```

---

### 2. Backend (`stack`)

#### Levantar con Docker

```bash
cd stack
cp .env.example .env
docker compose up --build
```

> El backend corre en: http://localhost:4000

---

Además, al iniciar por primera vez, **se ejecuta automáticamente el script `db/init.sql`** que crea la tabla `patients` si no existe:

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

> El frontend corre en: http://localhost:3000

---

## ⚙️ Variables de entorno

### stack/.env

```env
PORT=4000
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=patients_db

MAILTRAP_USER='mailtrapUser'
MAILTRAP_PASS='mailtrapPass'
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

---
