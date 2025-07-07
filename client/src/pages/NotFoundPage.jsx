import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
const NotFoundPage = () => {
  return (
    <>
       <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-background text-center px-4">
      <motion.h1
        className="text-7xl font-bold text-black dark:text-white mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl text-gray-600 dark:text-gray-300 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link to="/dashboard">
          <Button size="lg">Back to Dashboard</Button>
        </Link>
      </motion.div>
    </div>
    </>
  )
}

export default NotFoundPage
