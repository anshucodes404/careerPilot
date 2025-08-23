# Development Setup Guide

## Quick Setup Commands

### 1. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server will start on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Client will start on: http://localhost:3000

## Configuration Files

### Backend Configuration
- **Server Port**: Configured in `server/src/index.js` (default: 5000)
- **CORS**: Configured in `server/src/app.js` to accept both local and hosted origins
- **Database**: Configured via environment variables in `server/config/envConfig.js`

### Frontend Configuration
- **Backend URL**: Configured in `client/src/config/config.js`
- **Environment**: Set `CURRENT_ENV` to "LOCAL" for local development
- **Port**: Vite default port is 3000

## Switching Environments

### For Local Development
Edit `client/src/config/config.js`:
```javascript
CURRENT_ENV: "LOCAL"  // Uses http://localhost:5000
```

### For Production/Hosted
Edit `client/src/config/config.js`:
```javascript
CURRENT_ENV: "HOSTED" // Uses https://careerpilot-jizf.onrender.com
```

## Available Scripts

### Backend
- `npm run dev` - Development with auto-reload
- `npm start` - Production start

### Frontend
- `npm run dev` - Development server
- `npm run dev:local` - Local development mode
- `npm run build` - Production build
- `npm run build:local` - Local build

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   - Change port in `server/src/index.js`
   - Or kill process using port 5000

2. **CORS errors**
   - Verify CORS configuration in `server/src/app.js`
   - Check that frontend URL is included in allowed origins

3. **Database connection issues**
   - Check MongoDB connection string
   - Ensure MongoDB service is running

4. **Frontend not connecting to backend**
   - Verify `CURRENT_ENV` is set to "LOCAL" in config
   - Check that backend is running on correct port

### Environment Variables

Create `.env` files if needed:

**Server (.env):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

**Client (.env):**
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Development Workflow

1. **Start both servers** (backend and frontend)
2. **Make changes** to your code
3. **Backend auto-reloads** with `npm run dev`
4. **Frontend auto-reloads** with Vite HMR
5. **Test API endpoints** using the frontend or tools like Postman
6. **Switch environments** by changing config when needed

## API Testing

Test your local API endpoints at:
- `http://localhost:5000/api/goals/today-goals`
- `http://localhost:5000/api/applications/get`
- `http://localhost:5000/api/profile`
- `http://localhost:5000/api/ai/suggestions`
- `http://localhost:5000/api/resumes/upload`
