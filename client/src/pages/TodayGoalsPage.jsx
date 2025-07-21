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
import { Checkbox } from "@/components/ui/checkbox";
import GoalsDecidePage from "../components/GoalsDecidePage";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const TodayGoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState("");
  const { getToken } = useAuth();

  // Fetch token on mount
  useEffect(() => {
    fetchGoals();
  }, [getToken]);

  const fetchGoals = async () => {
    console.log("Fetching today goals")
      console.log("Fetching today goals");
    const token = await getToken();
    if (!token) {
      console.error("Authentication token not available.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/goals/today-goals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch goals: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setGoals(data.data || []);
    } catch (error) {
      console.error(error);
      setGoals([]); // Clear goals on error to avoid showing stale data
    }
    const data = await fetch("http://localhost:3000/api/goals/today-goals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => res.json())
     console.log(data.data)
     setGoals(data.data)
  }

  const handleSave = async () => {
    const token = await getToken();
    if (!token) {
      console.error("Authentication token not available.");
      return;
    }
    
    try {
      await fetch("http://localhost:3000/api/goals/today-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ goalText: goal }),
      });
      setGoal(""); // Clear input after successful save
      fetchGoals(); // Refresh the goals list
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

    const handleDelete = async (goalId) => {
      const goalToDelete = goals.find((item) => item._id === goalId);
      if (!goalToDelete) {
        console.error("Goal not found for deletion");
        return;
      }

      const token = await getToken();
       if (!token) {
        console.error("Authentication token not available.");
        return;
      }

      try {
        await fetch("http://localhost:3000/api/goals/today-goals", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            _id: goalToDelete._id,
            userId: goalToDelete.userId,
          }),
        });
        fetchGoals(); // Refresh the goals list
      } catch (error) {
        console.error("Failed to delete goal:", error);
      }
    };

  const toggleGoal = (goalId) => {
    const index = goals.findIndex((goal) => goal._id === goalId);
    console.log(index);
    goals[index].completed = !goals[index].completed;
    setGoals([...goals]); //to re-render the page so that changes becomes visible on screen
  };

  const handleAdd = () => {
    console.log("Add was clicked");
    setGoal("");
    console.log(goals);
    handleSave();
    fetchGoals()
  };


  return (
    <>
      <GoalsDecidePage />
      <div className="w-full mt-4">
        <Card className="mb-4 w-3/4 mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Add Daily Goal</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Solve 2 DSA problems"
              className="flex-1"
              value={goal}
              onKeyDown={(e) => {
                if (goal.length >= 5 && e.key === "Enter") handleAdd();
              }}
            />
            <Button onClick={handleAdd} disabled={goal.length <= 5}>
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
          {goals.length === 0 && (
            <h1 className="text-3xl font-bold text-gray-900/30 dark:text-white/30 text-center">
              Add Goals for Today
            </h1>
          )}

          {goals.map((goal) => (
            <div
              key={goal._id}
              className="flex items-center justify-between border p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoal(goal._id)}
                />
                <span
                  className={goal.completed ? "line-through text-gray-400" : ""}
                >
                  {goal.goalText}
                </span>
              </div>
              <div className="flex gap-2 text-gray-500">
                <Badge
                  className={goal.completed ? "bg-green-600" : "bg-red-600"}
                >
                  {goal.completed ? "Completed" : "Pending"}
                </Badge>
                <Edit
                  size={18}
                  className="cursor-pointer hover:text-blue-500"
                />
                <Trash
                  onClick={() => handleDelete(goal._id)}
                  size={18}
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
