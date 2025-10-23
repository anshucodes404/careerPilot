import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Trash, Edit, Save } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useGoal } from "../context/goalContext";

function GoalItem({ goal }) {
  const { toggleGoal, handleDelete, handleEdit } = useGoal();
  const [isEditable, setIsEditable] = useState(false);
  const [goalMsg, setGoalMsg] = useState(goal.goalText);
  
  const updateGoal = () => {
    handleEdit(goal._id, {...goal, goalText: goalMsg})
    setIsEditable(false);
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between border p-2 rounded-md"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          checked={goal.completed}
          onCheckedChange={() => toggleGoal(goal._id)}
        />
        <div className={`${goal.completed ? "line-through text-gray-400" : ""} bg-amber-600 w-3/4`}>
          <Input
            type="text"
            value={goalMsg}
            readOnly={!isEditable}
            className="flex-1 w-full"
            onChange={(e) => setGoalMsg(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 text-gray-500">
        <Badge className={goal.completed ? "bg-green-600" : "bg-red-600"}>
          {goal.completed ? "Completed" : "Pending"}
        </Badge>
        {isEditable ? (
          <Save
            size={18}
            className="cursor-pointer hover:text-green-500"
            onClick={() => {
              updateGoal();
            }}
          />
        ) : (
          <Edit
            onClick={() => {
              if (goal.completed) return;
              setIsEditable((prev) => !prev);
            }}
            disabled={goal.completed}
            size={18}
            className="cursor-pointer hover:text-blue-500"
          />
        )}

        <Trash
          onClick={() => handleDelete(goal._id)}
          size={18}
          className="cursor-pointer hover:text-red-500"
        />
      </div>
    </motion.div>
  );
}

export default GoalItem;
