# CareerPilot - Local Development Setup

This guide explains how to run CareerPilot locally for development while preserving the hosted server configuration.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Quick Start

### 1. Start the Backend Server

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Start the Frontend Client

```bash
cd client
npm install
npm run dev
```

The client will start on `http://localhost:3000`

## Configuration

### Switching Between Local and Hosted Backend

To switch between local and hosted backend, edit `client/src/config/config.js`:

```javascript
// For local development
CURRENT_ENV: "LOCAL"  // Uses http://localhost:5000

// For production/hosted
CURRENT_ENV: "HOSTED" // Uses https://careerpilot-jizf.onrender.com
```

### Environment Variables

The application automatically detects the environment and uses the appropriate backend URL.

## Available Scripts

### Backend (Server)
- `npm run dev` - Start server with auto-reload (development)
- `npm start` - Start server without auto-reload (production)

### Frontend (Client)
- `npm run dev` - Start development server
- `npm run dev:local` - Start development server in local mode
- `npm run build` - Build for production
- `npm run build:local` - Build for local development

## API Endpoints

The backend provides the following API endpoints:

- `/api/profile` - User profile management
- `/api/goals` - Daily and weekly goals
- `/api/applications` - Job application tracking
- `/api/resumes` - Resume management
- `/api/ai` - AI-powered features

## CORS Configuration

The server is configured to accept requests from both:
- `http://localhost:3000` (local development)
- `https://careerpilot-jizf.onrender.com` (hosted frontend)

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, you can change it in `server/src/index.js`:
```javascript
const PORT = process.env.PORT || 5001; // Change to 5001 or another port
```

### Database Connection
Ensure MongoDB is running and accessible. Check the connection string in your environment variables.

### CORS Issues
If you encounter CORS issues, verify that the frontend URL is included in the CORS configuration in `server/src/app.js`.