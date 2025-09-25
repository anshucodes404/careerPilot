import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUrl } from "@/context/urlContext";

const AvatarLogo = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const {url} = useUrl()

  //TODO: implement the hover feature later on

  // const closeTimer = useRef(null);

  // const handleMouseEnter = () => {
  //   if (closeTimer.current) {
  //     clearTimeout(closeTimer.current);
  //     closeTimer.current = null;
  //   }
  //   setOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   closeTimer.current = setTimeout(() => {
  //     setOpen(false);
  //   }, 300);
  // };

  // const handleClick = () => {
  //   setOpen((prev) => !prev); // toggle on click
  // };

  const signOut = async () => {
   const res = await fetch(`${url}/api/user/logout`, 
      {
        method: "POST",
        credentials: "include"
      }
    )
    const data = await res.json()
    console.log(data)

    navigate("/")
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {/* <div
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="cursor-pointer"
        > */}
          <Avatar>
            <AvatarImage src="/profile.jpg" alt="User" />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        {/* </div> */}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarLogo;
