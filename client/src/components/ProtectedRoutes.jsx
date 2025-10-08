import React from "react";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
const ProtectedRoutes = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoutes;
