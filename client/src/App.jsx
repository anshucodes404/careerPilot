import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import { ApplicationProvider } from "./context/applicationContext";
import { GoalProvider } from "./context/goalContext";
import { UrlProvider } from "./context/urlContext";
// import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <AuthProvider> */}
      
            <div className="flex-1">
              <Navbar />
              <Outlet />
            </div>
         
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}

export default App;
