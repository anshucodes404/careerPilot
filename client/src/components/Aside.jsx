import React from "react";

// import { useUser } from "@clerk/clerk-react";
// import { UserButton, SignedIn } from "@clerk/clerk-react";
import { NavLink } from "react-router";

const Aside = () => {
  // const user = useUser();
  // const firstName = user.user.firstName
  // console.log(user);

  return (
    <>
      <aside className="w-44 h-screen bg-white dark:bg-background shadow-md px-4 py-6 border-r-1">
        <div className="user flex">
          <div className="avatar">
            {/* <SignedIn>
              <UserButton />
            </SignedIn> */}
          </div>
          <div className="infoUser">
            {/* <div className="dark:text-white ml-2">{firstname}</div>  here firstName is crashing find why */}
            <div></div>
          </div>
        </div>
        

     
      </aside>
    </>
  );
};

export default Aside;
