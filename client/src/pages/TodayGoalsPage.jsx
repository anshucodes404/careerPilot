import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash, Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import GoalsDecidePage from "./GoalsDecidePage";

const TodayGoalsPage = () => {
  const goals = [
    {
      id: 1,
      text: "2 dsa problems",
      completed: false,
    },
    { 
      id: 2,
      text: "web dev problems",
      completed: false 
    },
    { 
      id: 3,
      text: "java dsa",
      completed: false
     },
  ];


  const toggleGoal = (goalId) => {
     goalId.completed = true
  }
  return (
    <>
     <GoalsDecidePage/>
      <div className="w-full">
        <Card className="mb-4 w-3/4 mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Add Daily Goal</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="e.g., Solve 2 DSA problems"
              className="flex-1"
            />
            <Button>
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 w-3/4 mx-auto">
        <CardHeader>
          <CardTitle>Today's Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-center justify-between border p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoal(goal.id)}
                />
                <span
                  className={goal.completed ? "line-through text-gray-400" : ""}
                >
                  {goal.text}
                </span>
              </div>
              <div className="flex gap-2 text-gray-500">
                <Edit
                  size={16}
                  className="cursor-pointer hover:text-blue-500"
                />
                <Trash
                  size={16}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default TodayGoalsPage;
