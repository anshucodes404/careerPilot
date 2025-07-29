# CareerPilot

CareerPilot is a modern web application to help students and professionals track job applications, manage interview prep, and stay on top of their career goals.

---

## 🚀 Technologies Used

<table>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="40" /><br/>React 19</td>
    <td align="center"><img src="https://vitejs.dev/logo.svg" width="40" /><br/>Vite</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" width="40" /><br/>Tailwind CSS</td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/9216092?s=200&v=4" width="40" /><br/>Clerk Auth</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="40" /><br/>Node.js</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="40" /><br/>Express</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" width="40" /><br/>MongoDB</td>
  </tr>
</table>

---

## 📁 Folder Structure

```
CareerPilot/
│
├── client/                # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/           # ShadCN UI components
│   │   │   ├── GoalItem.jsx  # Goal management component
│   │   │   ├── CardAppUI.jsx # Application tracking cards
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── goalContext.js # Goal state management
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Landing page
│   │   │   ├── ApplicationsPage.jsx # Job applications tracking
│   │   │   ├── TodayGoalsPage.jsx   # Daily goals management
│   │   │   ├── WeeklyGoalsPage.jsx  # Weekly goals (placeholder)
│   │   │   ├── DashboardPage.jsx    # User dashboard
│   │   │   ├── ProfilePage.jsx      # User profile
│   │   │   ├── ResumePage.jsx       # Resume management
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── router.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/
│   │   │   └── todayGoals.controller.js # Goal CRUD operations
│   │   ├── db/
│   │   │   └── index.js                 # MongoDB connection
│   │   ├── middlewares/
│   │   │   ├── clerk.middleware.js      # Clerk authentication
│   │   │   └── user.middleware.js       # User registration
│   │   ├── models/
│   │   │   ├── todayGoals.model.js      # Goal data model
│   │   │   └── user.model.js            # User data model
│   │   ├── routes/
│   │   │   ├── goals.route.js           # Goal API endpoints
│   │   │   └── user.route.js            # User API endpoints
│   │   ├── utils/
│   │   │   ├── ApiError.js              # Error handling
│   │   │   ├── ApiResponse.js           # Response formatting
│   │   │   └── asyncHandler.js          # Async error handling
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── index.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 📝 Features

### 🔐 Authentication & Security
- **Clerk Authentication**: Secure user authentication with Clerk
- **Protected Routes**: Route protection for authenticated users
- **JWT Token Management**: Secure API communication with Bearer tokens

### 🎯 Goal Management System
- **Daily Goals Tracking**: Create, edit, and manage daily learning goals
- **Goal Completion**: Mark goals as completed with visual indicators
- **Goal Editing**: Inline editing of goal text with save functionality
- **Goal Deletion**: Remove goals with confirmation
- **Real-time Updates**: Immediate UI updates with Framer Motion animations

### 💼 Application Tracking
- **Job Application Dashboard**: Track all job and internship applications
- **Application Status**: Visual status indicators (Applied, Interviewing, Passed, Rejected)
- **Company & Role Tracking**: Organize applications by company and position
- **Application Cards**: Clean, responsive UI for application management

### 🎨 User Interface
- **Modern Design**: Clean, responsive UI with Tailwind CSS
- **Dark/Light Mode**: Theme switching capability
- **Animated Components**: Smooth animations with Framer Motion
- **ShadCN UI**: Professional UI components
- **Responsive Design**: Mobile-first approach

### 🚀 Technical Features
- **RESTful API**: Complete CRUD operations for goals
- **MongoDB Integration**: Persistent data storage
- **Error Handling**: Comprehensive error management
- **Async Operations**: Non-blocking API calls
- **State Management**: Context API for goal state

### 📱 Pages & Navigation
- **Home Page**: Landing page with feature highlights
- **Dashboard**: User overview and quick actions
- **Applications**: Job application tracking interface
- **Today Goals**: Daily goal management
- **Weekly Goals**: Weekly planning (placeholder)
- **Profile**: User profile management
- **Resume**: Resume management (placeholder)

---

## 🛠️ API Endpoints

### Goals Management
- `GET /api/goals/today-goals` - Fetch user's daily goals
- `POST /api/goals/today-goals` - Create a new daily goal
- `DELETE /api/goals/today-goals` - Delete a specific goal
- `PATCH /api/goals/today-goals/:id` - Update a goal

### Authentication
- All endpoints require Clerk authentication
- Bearer token authentication for API access

---

## 🛠️ Getting Started

1. **Clone the repository to your local system**

   ```bash
   git clone https://github.com/your-username/CareerPilot.git
   cd CareerPilot
   ```

2. **Install dependencies** in both `client` and `server` folders

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both client and server directories with:
   - Clerk authentication keys
   - MongoDB connection string
   - Server port configuration

4. **Run the development servers**

   ```bash
   # In one terminal
   cd client
   npm run dev

   # In another terminal
   cd server
   npm start
   ```

5. **Access the application**

   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

---

## 🔧 Development

### Frontend Development
- React 19 with Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- ShadCN UI components
- React Router for navigation

### Backend Development
- Express.js server
- MongoDB with Mongoose ODM
- Clerk authentication middleware
- RESTful API design
- Error handling utilities

---

## 📄 License

MIT

---

Made with ❤️ by Anshu Kumar