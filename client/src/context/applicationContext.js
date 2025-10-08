import { createContext, useContext } from "react";

const applicationContext = createContext({
  applications: [
    {
      _id: 1,
      company: "",
      role: "",
      location: "",
      status: "",
      mode: "",
      resume: "",
      notes: "",
      appliedDate: "",
      interviewDate: "",
    },
  ],
  expandedIdx: null,
  setExpandedIdx: () => {},
  clickedIdx: null,
  setClickedIdx: () => {},
  saveApplication: () => {},
  editApplication: () => {},
  deleteApplication: () => {},
});

export const ApplicationProvider = applicationContext.Provider;

export const useApplication = () => {
  return useContext(applicationContext);
};
