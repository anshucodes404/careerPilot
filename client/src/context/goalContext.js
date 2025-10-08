import { createContext, useContext } from "react";

export const goalContext = createContext({
  goals: [
    {
      _id: 1,
      goalText: "Goal msg",
      completed: false,
    },
  ],
  handleEdit: () => {},
  handleDelete: () => {},
  fetchGoals: () => {},
  toggleGoal: () => {},
  handleAdd: () => {}
});


export const useGoal = () => {
    return useContext(goalContext)
}

export const GoalProvider = goalContext.Provider