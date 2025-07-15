import React from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const GoalsDecidePage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="px-13 py-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🎯 My Goals</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Set your daily and weekly goals to stay on track.
          </p>
        </div>

        <div className="flex gap-3 pr-10">
          <Button className={"cursor-pointer"}>
            <NavLink to={"/today-goals"}>Today's Goals</NavLink>
          </Button>
          <Button className={"cursor-pointer"}>
            <NavLink to={"/week-goals"}>Week's Goals</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default GoalsDecidePage;
