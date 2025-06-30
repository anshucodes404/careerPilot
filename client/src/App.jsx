import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    </ThemeProvider>
  )
}

export default App