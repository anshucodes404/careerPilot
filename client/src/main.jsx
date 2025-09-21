import { StrictMode } from 'react'
import './index.css'
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { ClerkProvider } from "@clerk/clerk-react";
import router from './router';
import { UrlProvider } from './context/urlContext';
import { config } from './config/config.js';

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!clerkPubKey) {
//   throw new Error('Missing Publishable Key')
// }

// Get the backend URL from configuration
const backendUrl = config.getBackendUrl();

ReactDOM.createRoot(document.getElementById("root")).render(
  <UrlProvider value={{url: backendUrl}}>
    {/* <ClerkProvider publishableKey={clerkPubKey}> */}
      <RouterProvider router={router} />
    {/* </ClerkProvider> */}
  </UrlProvider>
);
