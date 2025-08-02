import React from "react";
import CardAppUI from "../components/CardAppUI";
import { useState, useEffect } from "react";
import { ApplicationProvider, useApplication } from "../context/applicationContext";

const ApplicationPage = () => {
  const [application, setApplication] = useState([]);
  useEffect(() => {
    
  }, []);

  return (
    <ApplicationProvider>
      <div className="flex">
        <div>
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

          <main className="flex">
            <div className="px-10 mt-10 flex flex-wrap justify-center items-center">
              {/* mapping all the applications */}
              {app.map((item, index) => {
                return (
                  <div className="min-w-[250px] mx-3 my-5" key={index}>
                    <CardAppUI app={item} />
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </ApplicationProvider>
  );
};

export default ApplicationPage;
