import React from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <Tabs className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">
              <NavLink to={"/today-goals"}>Today's Goals</NavLink>
            </TabsTrigger>
            <TabsTrigger value="password">
              <NavLink to={"/week-goals"}>Week's Goals</NavLink>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default GoalsDecidePage;
