import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <section>
          <Navbar />
          <div>
            <Outlet />
          </div>
        </section>
    </ThemeProvider>
  );
}

export default App;
