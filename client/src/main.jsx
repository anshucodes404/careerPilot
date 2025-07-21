import { StrictMode } from 'react'
import './index.css'
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import router from './router';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ClerkProvider publishableKey={clerkPubKey} >
    <RouterProvider router={router} />
    </ClerkProvider>
 
)
