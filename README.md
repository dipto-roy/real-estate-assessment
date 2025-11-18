# 🏢 Real Estate Management System

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![NestJS](https://img.shields.io/badge/NestJS-10.0-red.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)
![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)

A full-stack real estate management platform featuring property listings, transaction tracking, and real-time messaging capabilities.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Mobile App](#-mobile-app)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The Real Estate Management System is a modern, full-stack application designed to streamline property management operations. Built with NestJS for the backend and React Native with Expo for mobile, it provides a robust platform for managing real estate projects, tracking transactions, and facilitating real-time communication between buyers, sellers, and realtors.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with role-based access control
- 📱 **Cross-Platform Mobile App** - Native iOS and Android experience via React Native
- 💬 **Real-Time Messaging** - WebSocket-powered group chats for instant communication
- 🌍 **Multi-Language Support** - Built-in internationalization (English & French)
- 📊 **Transaction Management** - Comprehensive tracking of property transactions
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations

---

## ✨ Features

### 🏗️ Backend (NestJS)

- **Authentication & Authorization**

  - JWT token-based authentication
  - Secure password hashing with bcrypt
  - Role-based access control (Buyer, Seller, Realtor)
  - Protected API endpoints with guards

- **User Management**

  - User registration and login
  - Profile management
  - Role assignment

- **Project Management**

  - CRUD operations for real estate projects
  - Project listing with detailed information
  - Creator relationship tracking
  - Project-specific transaction history

- **Transaction System**

  - Create and track financial transactions
  - Link transactions to projects
  - Associate buyers and sellers
  - Transaction history and reporting

- **Group Chat System**

  - Project-based group chats
  - Multi-user support
  - User membership management

- **Real-Time Messaging**

  - WebSocket integration via Socket.IO
  - Instant message delivery
  - Message history retrieval
  - Online presence tracking

- **Database & ORM**
  - Prisma ORM for type-safe database access
  - PostgreSQL database
  - Database migrations
  - Seed data for development

### 📱 Mobile (React Native + Expo)

- **Authentication Flow**

  - Login screen with email/password
  - Token persistence with AsyncStorage
  - Auto-login functionality
  - Secure logout

- **Projects Dashboard**

  - Browse all available projects
  - View project details
  - Pull-to-refresh functionality
  - Loading states and error handling

- **Transaction Tracking**

  - View transactions by project
  - Display buyer and seller information
  - Transaction amounts and dates
  - Formatted currency display

- **Real-Time Chat**

  - Group chat rooms per project
  - WebSocket-powered instant messaging
  - Message history
  - Sender identification
  - Auto-scroll to latest messages
  - Visual distinction between sent/received messages

- **Internationalization**

  - English and French language support
  - Easy language switching
  - Comprehensive translations across all screens

- **User Experience**
  - Smooth navigation with React Navigation
  - Clean, modern UI design
  - Responsive layouts
  - Loading indicators
  - Error boundaries

---

## 🛠️ Tech Stack

### Backend

| Technology            | Purpose                                                                       |
| --------------------- | ----------------------------------------------------------------------------- |
| **NestJS**            | Progressive Node.js framework for building efficient server-side applications |
| **TypeScript**        | Type-safe JavaScript superset                                                 |
| **Prisma**            | Next-generation ORM for Node.js and TypeScript                                |
| **PostgreSQL**        | Powerful, open-source relational database                                     |
| **Passport JWT**      | JWT authentication strategy for Passport                                      |
| **Socket.IO**         | Real-time bidirectional event-based communication                             |
| **bcrypt**            | Password hashing library                                                      |
| **class-validator**   | Validation decorators for DTOs                                                |
| **class-transformer** | Transform plain objects to class instances                                    |

### Mobile

| Technology            | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| **React Native**      | Framework for building native mobile apps using React |
| **Expo**              | Platform for making React Native development easier   |
| **TypeScript**        | Type-safe JavaScript superset                         |
| **React Navigation**  | Routing and navigation for React Native apps          |
| **Axios**             | Promise-based HTTP client                             |
| **Socket.IO Client**  | Real-time WebSocket communication                     |
| **AsyncStorage**      | Persistent key-value storage system                   |
| **i18next**           | Internationalization framework                        |
| **Expo Vector Icons** | Icon library for React Native                         |

### Development Tools

- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Auto-restart during development

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (Expo)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Login   │  │ Projects │  │ Details  │  │   Chat   │   │
│  │  Screen  │  │  Screen  │  │  Screen  │  │  Screen  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│         │              │              │            │        │
│         └──────────────┴──────────────┴────────────┘        │
│                        │                                    │
│                   API Services                              │
│         ┌──────────────┴──────────────┐                    │
│         │                             │                    │
│    HTTP (Axios)              WebSocket (Socket.IO)         │
└─────────┼─────────────────────────────┼───────────────────┘
          │                             │
          ▼                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    NestJS Backend API                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Users   │  │ Projects │  │Transact. │   │
│  │  Module  │  │  Module  │  │  Module  │  │  Module  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Chats   │  │ Messages │  │ WebSocket│                 │
│  │  Module  │  │  Module  │  │ Gateway  │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                        │                                    │
│                   Prisma ORM                                │
└────────────────────────┼───────────────────────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   PostgreSQL    │
                │    Database     │
                └─────────────────┘
```

### Database Schema

```prisma
model User {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  password     String
  role         Role
  createdAt    DateTime      @default(now())
  projects     Project[]     @relation("UserProjects")
  sentMessages Message[]
  // ... relations
}

model Project {
  id           String        @id @default(uuid())
  name         String
  description  String
  createdBy    User          @relation("UserProjects")
  transactions Transaction[]
  groupChats   GroupChat[]
}

model Transaction {
  id        String   @id @default(uuid())
  amount    Float
  project   Project  @relation
  buyer     User     @relation("BuyerTransactions")
  seller    User     @relation("SellerTransactions")
  createdAt DateTime @default(now())
}

model GroupChat {
  id        String    @id @default(uuid())
  project   Project   @relation
  users     User[]
  messages  Message[]
}

model Message {
  id        String    @id @default(uuid())
  content   String
  sender    User      @relation
  chat      GroupChat @relation
  createdAt DateTime  @default(now())
}
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **PostgreSQL** (v14 or higher)
- **Git**
- **Expo CLI** (for mobile development)
- **iOS Simulator** (macOS only) or **Android Studio** (for emulator)

```bash
# Check versions
node --version
npm --version
psql --version
git --version
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/dipto-roy/real-estate-assessment.git
cd real-estate-assessment
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Install Mobile Dependencies**

```bash
cd ../mobile
npm install
```

### Configuration

#### Backend Configuration

1. **Create environment file**

```bash
cd backend
cp .env.example .env
```

2. **Configure environment variables**

Edit `backend/.env`:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/real_estate_db?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRATION="7d"

# Server Configuration
PORT=3000
```

**Important Security Notes:**

- Change `JWT_SECRET` to a strong, random value in production
- Never commit `.env` files to version control
- Use different secrets for different environments

#### Mobile Configuration

1. **Update API endpoint**

Edit `mobile/services/api.ts`:

```typescript
// Replace with your machine's IP address
const API_BASE_URL = "http://YOUR_IP_ADDRESS:3000";
```

To find your IP address:

```bash
# Linux/macOS
hostname -I | awk '{print $1}'

# Windows
ipconfig
```

2. **Update Socket.IO endpoint**

Edit `mobile/services/socket.service.ts`:

```typescript
const SOCKET_URL = "http://YOUR_IP_ADDRESS:3000";
```

### Database Setup

1. **Create PostgreSQL database**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE real_estate_db;

# Create user (optional)
CREATE USER real_estate_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE real_estate_db TO real_estate_user;

# Exit
\q
```

2. **Run Prisma migrations**

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database with demo data
npm run prisma:seed
```

**Demo Accounts (after seeding):**

- Buyer: `buyer@example.com` / `password123`
- Seller: `seller@example.com` / `password123`
- Realtor: `realtor@example.com` / `password123`

### Running the Application

#### Start Backend Server

```bash
cd backend

# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Backend will be available at `http://localhost:3000`

#### Start Mobile App

```bash
cd mobile

# Start Expo development server
npm start

# Or run directly on platform
npm run android  # For Android
npm run ios      # For iOS (macOS only)
```

**Using Expo Go:**

1. Install Expo Go app on your mobile device
2. Scan the QR code from the terminal
3. Ensure your phone and computer are on the same WiFi network

---

## 📁 Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts   # Auth endpoints
│   │   ├── auth.service.ts      # Auth business logic
│   │   ├── jwt.strategy.ts      # JWT strategy
│   │   ├── jwt-auth.guard.ts    # Auth guard
│   │   └── dto/                 # Data transfer objects
│   │
│   ├── users/                   # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │
│   ├── projects/                # Projects module
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   └── dto/
│   │
│   ├── transactions/            # Transactions module
│   │   ├── transactions.controller.ts
│   │   ├── transactions.service.ts
│   │   └── dto/
│   │
│   ├── group-chats/             # Group chats module
│   │   ├── group-chats.controller.ts
│   │   ├── group-chats.service.ts
│   │   └── dto/
│   │
│   ├── messages/                # Messages module
│   │   ├── messages.controller.ts
│   │   ├── messages.service.ts
│   │   ├── messages.gateway.ts  # WebSocket gateway
│   │   └── dto/
│   │
│   ├── common/                  # Shared utilities
│   │   ├── prisma.service.ts    # Prisma service
│   │   └── pagination.util.ts   # Pagination helper
│   │
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry point
│
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Seed script
│   └── migrations/              # Database migrations
│
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── nest-cli.json                # NestJS CLI config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

### Mobile Structure

```
mobile/
├── screens/                     # Application screens
│   ├── LoginScreen.tsx          # Authentication screen
│   ├── ProjectsScreen.tsx       # Projects list
│   ├── ProjectDetailsScreen.tsx # Project details + transactions
│   └── ChatScreen.tsx           # Real-time chat
│
├── services/                    # API services
│   ├── api.ts                   # Axios instance + Auth service
│   ├── users.service.ts         # Users API
│   ├── projects.service.ts      # Projects API
│   ├── transactions.service.ts  # Transactions API
│   ├── group-chats.service.ts   # Group chats API
│   ├── messages.service.ts      # Messages API
│   └── socket.service.ts        # WebSocket service
│
├── i18n/                        # Internationalization
│   ├── en.json                  # English translations
│   ├── fr.json                  # French translations
│   └── index.ts                 # i18n configuration
│
├── hooks/                       # Custom React hooks
│   └── useLocalization.ts       # Language switching
│
├── assets/                      # Static assets
│   ├── icon.png
│   ├── splash.png
│   └── ...
│
├── App.tsx                      # Root component
├── app.json                     # Expo configuration
├── babel.config.js              # Babel configuration
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

---

## 🔌 API Reference

### Base URL

```
http://localhost:3000
```

### Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Authentication

| Method | Endpoint         | Auth Required | Description       |
| ------ | ---------------- | ------------- | ----------------- |
| POST   | `/auth/register` | No            | Register new user |
| POST   | `/auth/login`    | No            | Login user        |

**Register User**

```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer"
}

Response: 201 Created
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

**Login**

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### Users

| Method | Endpoint     | Auth Required | Description    |
| ------ | ------------ | ------------- | -------------- |
| POST   | `/users`     | No            | Create user    |
| GET    | `/users`     | Yes           | Get all users  |
| GET    | `/users/:id` | Yes           | Get user by ID |

#### Projects

| Method | Endpoint        | Auth Required | Description       |
| ------ | --------------- | ------------- | ----------------- |
| POST   | `/projects`     | Yes           | Create project    |
| GET    | `/projects`     | Yes           | Get all projects  |
| GET    | `/projects/:id` | Yes           | Get project by ID |

**Get All Projects**

```bash
GET /projects
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "name": "Luxury Villa",
    "description": "Beautiful villa with ocean view",
    "createdById": "uuid",
    "createdBy": {
      "name": "John Seller",
      "email": "seller@example.com"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  },
  ...
]
```

**Create Project**

```bash
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Modern Apartment",
  "description": "Downtown luxury apartment",
  "createdById": "user-uuid"
}

Response: 201 Created
{
  "id": "project-uuid",
  "name": "Modern Apartment",
  ...
}
```

#### Transactions

| Method | Endpoint                       | Auth Required | Description                 |
| ------ | ------------------------------ | ------------- | --------------------------- |
| POST   | `/transactions`                | Yes           | Create transaction          |
| GET    | `/transactions`                | Yes           | Get all transactions        |
| GET    | `/transactions?projectId=<id>` | Yes           | Get transactions by project |

**Get Transactions**

```bash
GET /transactions?projectId=<uuid>&page=1&limit=10
Authorization: Bearer <token>

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "amount": 450000,
      "projectId": "uuid",
      "buyerId": "uuid",
      "sellerId": "uuid",
      "buyer": {
        "name": "John Buyer",
        "email": "buyer@example.com"
      },
      "seller": {
        "name": "Sarah Seller",
        "email": "seller@example.com"
      },
      "createdAt": "2024-01-15T14:20:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

#### Group Chats

| Method | Endpoint                 | Auth Required | Description       |
| ------ | ------------------------ | ------------- | ----------------- |
| POST   | `/group-chats`           | Yes           | Create group chat |
| POST   | `/group-chats/:id/users` | Yes           | Add user to chat  |
| GET    | `/group-chats`           | Yes           | Get all chats     |
| GET    | `/group-chats/:id`       | Yes           | Get chat by ID    |

#### Messages

| Method | Endpoint                | Auth Required | Description          |
| ------ | ----------------------- | ------------- | -------------------- |
| POST   | `/messages`             | Yes           | Send message         |
| GET    | `/messages`             | Yes           | Get messages         |
| GET    | `/messages?chatId=<id>` | Yes           | Get messages by chat |

**Get Messages**

```bash
GET /messages?chatId=<uuid>&page=1&limit=50
Authorization: Bearer <token>

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "content": "Hello, is this property still available?",
      "senderId": "uuid",
      "chatId": "uuid",
      "sender": {
        "name": "John Buyer",
        "email": "buyer@example.com"
      },
      "createdAt": "2024-01-15T15:30:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 50
}
```

**Send Message**

```bash
POST /messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "chatId": "chat-uuid",
  "senderId": "user-uuid",
  "content": "Yes, it's available for viewing!"
}

Response: 201 Created
{
  "id": "message-uuid",
  "content": "Yes, it's available for viewing!",
  "chatId": "chat-uuid",
  "senderId": "user-uuid",
  "createdAt": "2024-01-15T15:31:00Z"
}
```

### WebSocket Events

Connect to WebSocket server at `ws://localhost:3000`

**Client Events (Emit):**

```javascript
// Join a chat room
socket.emit("joinChat", { chatId: "chat-uuid" });

// Leave a chat room
socket.emit("leaveChat", { chatId: "chat-uuid" });
```

**Server Events (Listen):**

```javascript
// New message received
socket.on("messageCreated", (message) => {
  console.log("New message:", message);
  // {
  //   id: 'uuid',
  //   content: 'Hello!',
  //   senderId: 'uuid',
  //   chatId: 'uuid',
  //   sender: { name: 'John', ... },
  //   createdAt: '2024-01-15T15:30:00Z'
  // }
});
```

---

## 📱 Mobile App

### Screens Overview

#### 1. Login Screen

- Email and password authentication
- Demo account quick access
- Form validation
- Error handling
- Auto-login with saved token

#### 2. Projects Screen

- Grid/list of all projects
- Project cards with:
  - Project name
  - Description
  - Creator name
  - Transaction count
- Pull-to-refresh
- Navigation to details

#### 3. Project Details Screen

- Complete project information
- Transaction history list
- Transaction cards showing:
  - Buyer name
  - Seller name
  - Amount (formatted)
  - Transaction date
- "Open Project Chat" button
- Navigation to chat

#### 4. Chat Screen

- Real-time messaging interface
- Message history
- Visual distinction:
  - Your messages: Blue, right-aligned
  - Other messages: White, left-aligned with sender name
- Message input field
- Send button
- Auto-scroll to latest message
- WebSocket connection status

### Navigation Flow

```
LoginScreen
    ↓
ProjectsScreen ←→ [Language Toggle]
    ↓
ProjectDetailsScreen
    ↓
ChatScreen
```

### Features

✅ **JWT Authentication** - Secure token-based auth
✅ **Persistent Login** - AsyncStorage token persistence
✅ **Real-Time Updates** - WebSocket integration
✅ **Offline Support** - Cached data with pull-to-refresh
✅ **Error Handling** - Graceful error states
✅ **Loading States** - Skeleton screens and spinners
✅ **Internationalization** - EN/FR language support
✅ **Type Safety** - Full TypeScript coverage

---

## 🧪 Development

### Backend Development

**Start in development mode with hot-reload:**

```bash
cd backend
npm run start:dev
```

**Available scripts:**

```bash
npm run start          # Start in production mode
npm run start:dev      # Start with hot-reload
npm run build          # Build for production
npm run prisma:migrate # Run database migrations
npm run prisma:studio  # Open Prisma Studio (database GUI)
npm run prisma:seed    # Seed database with demo data
```

**Database management:**

```bash
# Open Prisma Studio
npm run prisma:studio

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Generate Prisma Client
npm run prisma:generate
```

### Mobile Development

**Start Expo development server:**

```bash
cd mobile
npm start
```

**Platform-specific commands:**

```bash
npm run android  # Run on Android emulator/device
npm run ios      # Run on iOS simulator (macOS only)
npm run web      # Run in web browser
```

**Clear cache:**

```bash
expo start -c
```

### Code Style

This project follows standard TypeScript and React best practices:

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Write meaningful commit messages
- Keep functions small and focused
- Add comments for complex logic

---

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### API Testing

**Using cURL:**

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"buyer@example.com","password":"password123"}'

# Get projects (with token)
curl -X GET http://localhost:3000/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Using Postman:**

1. Import the API collection
2. Set base URL: `http://localhost:3000`
3. Add Authorization header with JWT token
4. Test all endpoints

### Mobile Testing

**Test on physical device:**

1. Install Expo Go app
2. Scan QR code from terminal
3. Ensure same WiFi network

**Test on emulator:**

```bash
# Android
npm run android

# iOS (macOS only)
npm run ios
```

---

## 🚀 Deployment

### Backend Deployment

#### Option 1: Traditional VPS (DigitalOcean, AWS EC2, etc.)

```bash
# 1. Clone repository on server
git clone https://github.com/dipto-roy/real-estate-assessment.git
cd real-estate-assessment/backend

# 2. Install dependencies
npm install --production

# 3. Set environment variables
nano .env  # Add production values

# 4. Run migrations
npm run prisma:migrate deploy

# 5. Build application
npm run build

# 6. Start with PM2
npm install -g pm2
pm2 start dist/main.js --name real-estate-api
pm2 save
pm2 startup
```

#### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

```bash
# Build and run
docker build -t real-estate-api .
docker run -p 3000:3000 --env-file .env real-estate-api
```

#### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set JWT_EXPIRATION=7d

# Deploy
git push heroku main
```

#### Option 4: Railway / Render

1. Connect GitHub repository
2. Set environment variables
3. Add PostgreSQL database
4. Deploy automatically on push

### Mobile Deployment

#### Build for Production

**Android:**

```bash
cd mobile

# Build APK
eas build --platform android

# Build AAB for Google Play
eas build --platform android --profile production
```

**iOS:**

```bash
cd mobile

# Build for TestFlight
eas build --platform ios

# Build for App Store
eas build --platform ios --profile production
```

#### Publish to Stores

**Google Play Store:**

1. Create developer account
2. Upload AAB file
3. Complete store listing
4. Submit for review

**Apple App Store:**

1. Create Apple Developer account
2. Upload to App Store Connect
3. Complete app information
4. Submit for review

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**

```bash
git clone https://github.com/YOUR_USERNAME/real-estate-assessment.git
cd real-estate-assessment
```

2. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**

- Write clean, maintainable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

4. **Test your changes**

```bash
# Backend tests
cd backend && npm test

# Mobile - manual testing
cd mobile && npm start
```

5. **Commit your changes**

```bash
git add .
git commit -m "feat: add your feature description"
```

**Commit message format:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process or auxiliary tool changes

6. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

7. **Create Pull Request**

- Go to the original repository
- Click "New Pull Request"
- Select your feature branch
- Describe your changes
- Submit for review

### Code of Conduct

- Be respectful and inclusive
- Write clear commit messages
- Test before submitting
- Document new features
- Keep PRs focused and small

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Dip Roy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Dip Roy**

- GitHub: [@dipto-roy](https://github.com/dipto-roy)
- Email: dipto.roy.cs@gmail.com

---

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Expo team for simplifying React Native development
- Prisma team for the excellent ORM
- Socket.IO team for real-time capabilities
- The open-source community

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#-documentation)
2. Search [existing issues](https://github.com/dipto-roy/real-estate-assessment/issues)
3. Create a [new issue](https://github.com/dipto-roy/real-estate-assessment/issues/new)

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Unit and integration tests
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Docker containerization
- [ ] API rate limiting
- [ ] File upload for property images
- [ ] Email notifications
- [ ] Push notifications for mobile
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] Payment integration
- [ ] Document management
- [ ] Calendar/scheduling system

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

Made with ❤️ by [Dip Roy](https://github.com/dipto-roy)

</div>
