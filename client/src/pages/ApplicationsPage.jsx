import React, { useState, useEffect } from "react";
import CardAppUI from "../components/CardAppUI";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Plus, Search, Filter } from "lucide-react";
import AddApplication from "../components/addApplication";
// import { useAuth } from "@clerk/clerk-react";
import ApplicationExpanded from "../components/ApplicatoinExpanded";
import { ApplicationProvider } from "../context/applicationContext";
import AlertDialogBox from "../components/AlertDialogBox";
import { useUrl } from "../context/urlContext";


const ApplicationPage = () => {
  const {url} = useUrl()
  const [applications, setApplications] = useState([]);
  // const { getToken } = useAuth();
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [clickedIdx, setClickedIdx] = useState(null);

  // Filter applications based on search term and status
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get statistics
  const stats = {
    total: applications.length,
    interviewing: applications.filter((app) => app.status === "Interviewing")
      .length,
    passed: applications.filter((app) => app.status === "Passed").length,
    rejected: applications.filter((app) => app.status === "Rejected").length,
  };

  useEffect(() => {
    getApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApplications = async () => {
    try {
      // const token = await getToken();
      const res = await fetch(`${url}/api/applications/get`, {
        method: "GET",
        credentials: "include",
      });

      const applications = await res.json();
      console.log(applications);
      console.log(applications.data);
      setApplications(applications.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveApplication = async (formData) => {
    console.log(formData);
    try {
      console.log("Try block");
      // const token = await getToken();
      const response = await fetch(`${url}/api/applications/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      setApplications((prev) => [...prev, data.data]);
    } catch (error) {
      console.error("Application saving falied", error);
    }
  };
  const editApplication = async (formData) => {
    console.table(formData);
    try {
      setExpandedIdx(null);
      // const token = await getToken();
      const response = await fetch(
        `${url}/api/applications/put/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((application) =>
            application._id === formData._id ? data.data : application
          )
        );
      }
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };
  const deleteApplication = async (formData) => {
    console.table(formData);
    setExpandedIdx(null);
    try {
      // const token = await getToken();
      const response = await fetch(
        `${url}/api/applications/delete/${formData._id}`,
        {
          method: "DELETE",
          headers: {
            // Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data.data);
      if (data.success) {
        setApplications((prev) =>
          prev.filter((application) => application._id !== formData._id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ApplicationProvider
      value={{
        applications,
        expandedIdx,
        setExpandedIdx,
        setClickedIdx,
        clickedIdx,
        saveApplication,
        editApplication,
        deleteApplication,
      }}
    >
      <div className="min-h-screen">
        {/* Header Section */}
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                  Applications
                </h1>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Track and manage your job applications
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button
                  className="ml-3"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Application
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="px-4 py-5 bg-white dark:bg-neutral-800 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">
                  Total Applications
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-black dark:text-white">
                  {stats.total}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white dark:bg-neutral-800 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">
                  Interviewing
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600 dark:text-blue-400">
                  {stats.interviewing}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white dark:bg-neutral-800 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">
                  Offers
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">
                  {stats.passed}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white dark:bg-neutral-800 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">
                  Rejected
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-red-600 dark:text-red-400">
                  {stats.rejected}
                </dd>
              </div>
            </div>

            {/* Filters Section */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <Input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
                className="w-full sm:w-[200px]"
              >
                <option value="all">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Passed">Passed</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </div>
          </div>
        </header>

        {/* Applications Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredApplications.map((item, index) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CardAppUI
                  app={item}
                  onClick={() => {
                    setExpandedIdx(index);
                    setClickedIdx(index);
                  }}
                />
              </motion.div>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400">
                No applications found matching your criteria.
              </p>
            </div>
          )}

          <AnimatePresence>
            {expandedIdx !== null && (
              <>
                <motion.div
                  className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setExpandedIdx(null);
                    setClickedIdx(null);
                  }}
                />
                <motion.div
                  className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <ApplicationExpanded
                    application={applications[expandedIdx]}
                    onDelete={(app) => {
                      setDeleteTarget(app);
                      setExpandedIdx(null);
                      setIsDeleteDialogOpen(true);
                    }}
                    onClose={() => setExpandedIdx(null)}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <AlertDialogBox
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title="Delete application?"
            description="This action cannot be undone. The application will be permanently removed."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            destructive
            onConfirm={() => {
              // Close dialog immediately
              setIsDeleteDialogOpen(false);
              setClickedIdx(null);
              setDeleteTarget(null);

              // Perform async deletion in background
              if (deleteTarget) {
                deleteApplication(deleteTarget);
              }
            }}
            onCancel={() => {
              setIsDeleteDialogOpen(false);
              setExpandedIdx(clickedIdx);
              setDeleteTarget(null);
            }}
          />

          <AddApplication
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        </main>
      </div>
    </ApplicationProvider>
  );
};

export default ApplicationPage;
