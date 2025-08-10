import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Calendar,
  CalendarClock,
  MapPin,
  Building,
  Clock,
  FileText,
  Phone,
  X
} from "lucide-react";
import { Separator } from "./ui/separator";
import { getStatusStyles } from "./CardAppUI";
import { Button } from "./ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApplicationExpandedEditable from "./ApplicationExpandedEditable";
import { useApplication } from "../context/applicationContext";

const ApplicationExpanded = ({ application, onDelete, onClose }) => {
  const [isEditable, setIsEditable] = useState(false);
  const formattedDate = application?.appliedDate
    ? new Date(application.appliedDate).toLocaleDateString()
    : "Not specified";

  return (
    <>
      <Card className="w-[90vw] max-w-3xl relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-black dark:text-white">
                {application?.company}
              </CardTitle>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-1">
                {application?.role}
              </p>
            </div>
            <Badge className={getStatusStyles(application?.status)}>
              {application?.status}
            </Badge>
          </div>
        </CardHeader>

        <button 
        className="absolute top-2 right-4 dark:text-neutral-400 dark:hover:text-white text-neutral-600 hover:text-black"
        onClick={onClose}
        >
          <X />
        </button>

        <Separator className="bg-neutral-200 dark:bg-neutral-800" />

        <CardContent className="pt-6 space-y-6">
          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
              <Building className="h-4 w-4" />
              <span>{application?.company}</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
              <MapPin className="h-4 w-4" />
              <span>{application?.location || "Location not specified"}</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
              <Calendar className="h-4 w-4" />
              <span>Applied Date: {formattedDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
              <Clock className="h-4 w-4" />
              <span>Last Updated: {formattedDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
              <CalendarClock className="h-4 w-4" />
              <span>Interview Date: {formattedDate}</span>
            </div>
          </div>

          {/* Description */}
          {application?.description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Job Description
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                {application.description}
              </p>
            </div>
          )}

          {/* Notes */}
          {application?.notes && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black dark:text-white flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                {application.notes}
              </p>
            </div>
          )}

          {/* Contact Information */}
          {(application?.Name || application?.Email) && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black dark:text-white flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Contact Information
              </h3>
              <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg space-y-2">
                {application?.Name && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Contact: {application.contact}
                  </p>
                )}
                {application?.contactEmail && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Email: {application.Email}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          {/* {application?.timeline && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Application Timeline
              </h3>
              <div className="space-y-3">
                {application.timeline.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-neutral-600 dark:text-neutral-400"
                  >
                    <div className="w-4 h-4 mt-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                    <div>
                      <p className="font-medium text-black dark:text-white">
                        {event.title}
                      </p>
                      <p className="text-sm">{event.date}</p>
                      {event.notes && (
                        <p className="text-sm mt-1">{event.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Buttons for edit and delete */}
          <div className="flex gap-2 justify-end">
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(application);
              }}
              className={"dark:bg-red-600"}
            >
              Delete
            </Button>
            <Button onClick={() => setIsEditable(true)}>Edit</Button>
          </div>
        </CardContent>
      </Card>
      {/* after clicking on edit button editable window opens */}
      <AnimatePresence>
        {isEditable && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditable(false)}
            />
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <ApplicationExpandedEditable
                application={application}
                onClose={() => setIsEditable(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ApplicationExpanded;
