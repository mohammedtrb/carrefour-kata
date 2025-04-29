# Delivery Tracking API - KATA

This project is a backend service for a delivery tracking system built with Spring Boot and a PostgreSQL database. It also includes an Angular frontend application for interacting with the API.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Java 21** or higher
- **Maven** (for building the Spring Boot project)
- **PostgreSQL** (for the database)
- **Node.js** and **npm** (for the Angular app)

---

## Backend (Spring Boot) Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd delivery-tracking-api
```

### 2. Configure the Database
Ensure PostgreSQL is running and create a database named `altenkata_fr`. Update the database credentials in `src/main/resources/application.properties` if necessary:
```ini
spring.datasource.url=jdbc:postgresql://localhost:5432/altenkata_fr
spring.datasource.username=kata_user
spring.datasource.password=kata_password
```

### 3. Build and Run the Backend
Run the following commands:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`.

---

## Frontend (Angular) Setup

### 1. Navigate to the Angular App Directory
Assuming the Angular app is located in a folder named `delivery-tracking-app`:
```bash
cd delivery-tracking-app
```

### 2. Install Dependencies
Run the following command to install the required npm packages:
```bash
npm install
```
### 3. Run the Angular App
Start the Angular development server:
```bash
ng serve
```

### 4. Environment Variables
Ensure the Angular app is configured to communicate with the backend. Update the `environment.ts` file in the `src/environments` folder with the backend API URL:
```typescript
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api'
};
```
For production, update the `environment.prod.ts` file accordingly.

The Angular app will be available at `http://localhost:4200`.

---

## Testing the Application

1. Ensure both the backend and frontend are running.
2. Open the Angular app in your browser at `http://localhost:4200`.
3. Use the UI to interact with the delivery tracking API.

---

## Notes

- The backend uses a `CommandLineRunner` to initialize dummy data in the database.
- The database schema is automatically created on startup (`spring.jpa.hibernate.ddl-auto=create`).

Feel free to modify the configuration as needed.
