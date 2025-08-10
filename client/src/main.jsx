import { StrictMode } from 'react'
import './index.css'
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import router from './router';
import { UrlProvider } from './context/urlContext';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Publishable Key')
}

// Define the backend URL - you can change this based on environment
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UrlProvider value={{url: backendUrl}}>
    <ClerkProvider publishableKey={clerkPubKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </UrlProvider>
);
