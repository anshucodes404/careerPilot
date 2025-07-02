import React, { useState, useEffect } from "react";
import CardAppUI from "../components/CardAppUI";
import { AnimatePresence, motion } from "framer-motion";

const ApplicationPage = () => {
  const [app, setApp] = useState([]);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    setApp([
      {
        company: "Google",
        role: "Software Engineer Intern",
        status: "Interviewing",
        details: "Interview scheduled for 10th July.",
      },
      {
        company: "Amazon",
        role: "Backend Developer Intern",
        status: "Applied",
        details: "Application submitted on 1st July.",
      },
      {
        company: "Microsoft",
        role: "Frontend Developer Intern",
        status: "Rejected",
        details: "Not selected.",
      },
      {
        company: "Meta",
        role: "Software Engineer Intern",
        status: "Passed",
        details: "Offer extended.",
      },
      {
        company: "Netflix",
        role: "Data Analyst Intern",
        status: "Interviewing",
        details: "Interview on 15th July.",
      },
      {
        company: "Uber",
        role: "DevOps Intern",
        status: "Applied",
        details: "Application under review.",
      },
      {
        company: "Adobe",
        role: "Machine Learning Intern",
        status: "Passed",
        details: "Offer accepted.",
      },
      {
        company: "Flipkart",
        role: "UI/UX Intern",
        status: "Rejected",
        details: "Not selected.",
      },
    ]);
  }, []);

  return (
    <>
      <header>
        <div className="px-6 py-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Applications
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all the companies you’ve applied to.
          </p>
        </div>
      </header>

      <main className="px-10 mt-10 flex flex-wrap justify-center items-center relative">
        {app.map((item, index) => (
          <div
            className="min-w-[250px] mx-3 my-5"
            key={index}
            style={{ minHeight: "180px" }}
          >
            {expandedIdx === index ? (
              // Empty placeholder to keep space
              <div style={{ visibility: "hidden", height: "100%" }} />
            ) : (
              <CardAppUI app={item} onClick={() => setExpandedIdx(index)} />
            )}
          </div>
        ))}

        <AnimatePresence>
          {expandedIdx !== null && (
            <>
              {/* Blur background */}
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedIdx(null)}
              />
              {/* Centered expanded card */}
              <motion.div
                className="fixed z-50 top-1/2 left-1/2"
                style={{ transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <CardAppUI
                  app={app[expandedIdx]}
                  expanded
                  onClose={() => setExpandedIdx(null)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default ApplicationPage;
