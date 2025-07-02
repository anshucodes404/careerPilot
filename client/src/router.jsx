import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ApplicationsPage from "./pages/ApplicationsPage";

// const profileLoader = async () => {
//   const res = await fetch("/api/profile");
//   if (!res.ok) throw new Error("Failed to load profile");
//   return res.json();
// };



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
        // loader: profileLoader,
      },
      {
        path: "applications",
        element: (
          <ProtectedRoutes>
            <ApplicationsPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
