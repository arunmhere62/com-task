# Student Management System - Setup Guide

This is a NestJS-based Student Management System with JWT authentication and CRUD operations for managing students and classes.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database
- Git (optional)

## Setup Instructions

1. **Clone the repository** (if not already cloned):
   ```bash
   git clone <repository-url>
   cd nestjs-task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Update the database connection details in `.env`
   - Set a strong `JWT_SECRET`

4. **Database setup**:
   - Create a new PostgreSQL database
   - Update the database credentials in `.env`
   - The application will automatically create tables on first run (in development mode)

5. **Run database migrations** (if needed):
   ```bash
   npm run typeorm migration:run
   ```

6. **Start the development server**:
   ```bash
   npm run start:dev
   ```

7. **Access the API documentation**:
   - Open `http://localhost:3000/api` in your browser for Swagger documentation

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Students (Requires Authentication)
- `GET /students` - Get all students
- `POST /students` - Create a new student
- `GET /students/:id` - Get a specific student
- `PUT /students/:id` - Update a student
- `DELETE /students/:id` - Delete a student

### Classes (Requires Authentication)
- `GET /classes` - Get all classes
- `POST /classes` - Create a new class
- `GET /classes/:id` - Get a specific class with students
- `PUT /classes/:id` - Update a class
- `DELETE /classes/:id` - Delete a class

## Testing

Run unit tests:
```bash
npm run test
```

Run e2e tests:
```bash
npm run test:e2e
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start:prod
   ```

## Environment Variables

- `NODE_ENV` - Application environment (development/production)
- `PORT` - Port to run the server (default: 3000)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT token generation

## License

MIT
