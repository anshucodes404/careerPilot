// src/components/Navbar.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import React from "react";
import { ModeToggle } from "./mode-toggle";
// import {
//   SignedOut,
//   SignInButton,
// } from "@clerk/clerk-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import AvatarLogo from "./AvatarLogo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-2 shadow-md bg-white dark:bg-[#0a0a0a] backdrop-blur-lg sticky top-0 z-navbar">
      <NavLink to={"/dashboard"}>
        <motion.h1
          className="text-2xl font-bold text-teal-600 dark:text-teal-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Career Pilot
        </motion.h1>
      </NavLink>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-2 justify-center items-center w-full font-semibold">
          <NavigationMenuItem className={""}>
            <NavigationMenuLink className="text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
              <NavLink to="/profile">Profile</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={""}>
            <NavigationMenuLink className="text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
              <NavLink to="/dashboard" end>
                Dashboard
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={""}>
            <NavigationMenuLink className="text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
              <NavLink to="/applications" end>
                Applications
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={""}>
            <NavigationMenuLink className="text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
              <NavLink to={"/today-goals"}>Goals</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={""}>
            <NavigationMenuLink className="text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
              <NavLink to={"/resume"}>Resume</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={""}>
            <NavigationMenuLink className="text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400">
              <NavLink to={"/ai"}>🤖</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Desktop menu */}
      <motion.div
        className="space-x-4 hidden sm:flex items-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost">Login</Button>
          </SignInButton>
        </SignedOut> */}
        
        <ModeToggle />
        <AvatarLogo/>
      </motion.div>

      {/* Mobile menu toggle */}
      <div className="sm:hidden flex items-center gap-2">
        <ModeToggle />
        <AvatarLogo/>
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
            {/* <SignedOut>
              <SignInButton>
                <Button variant="ghost" className="w-full">
                  Login
                </Button>
              </SignInButton>
            </SignedOut> */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
