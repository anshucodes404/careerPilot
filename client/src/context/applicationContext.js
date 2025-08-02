import { createContext, useContext } from "react";

const applicationContext = createContext({
  apllications: [
    {
      _id: 1,
      companyName: "Google",
      role: "SDE-2",
      interviewDate: "",
      note: "",
      resumeLink: "",
      success: true,
      isPending: false,
    },
  ],
  createApplication: () => {},
  editApplication: () => {},
  deleteApplication: () => {},
});

export const ApplicationProvider = applicationContext.Provider;

export const useApplication = () => {
  return useContext(applicationContext);
};
