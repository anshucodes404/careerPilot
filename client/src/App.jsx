import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Navbar/>
    <HomePage/>
    </ThemeProvider>
  )
}

export default App