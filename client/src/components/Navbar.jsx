// src/components/Navbar.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900 sticky top-0 z-50">
      <motion.h1
        className="text-2xl font-bold text-teal-600 dark:text-teal-400"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Career Pilot
      </motion.h1>

      {/* Desktop menu */}
      <motion.div
        className="space-x-4 hidden sm:flex items-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Button variant="default">Get Started</Button>
        <ModeToggle />
      </motion.div>

      {/* Mobile menu toggle */}
      <div className="sm:hidden flex items-center gap-2">
        <ModeToggle />
        <Button
          variant="ghost"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-6 bg-white dark:bg-gray-800 p-4 rounded shadow-md sm:hidden"
          >
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full" >Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <Button variant="default" className="w-full">
              Get Started
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
