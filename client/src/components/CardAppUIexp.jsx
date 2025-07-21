import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

const CardAppUI = ({ app, onClick, expanded, onClose }) => {
  return (
    <Card
      className={`cursor-pointer dark:bg-muted hover:shadow-lg transition min-w-[250px] relative ${
        expanded ? "w-[350px] min-h-[250px] p-6" : ""
      }`}
      onClick={expanded ? undefined : onClick}
      style={expanded ? { cursor: "default" } : {}}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{app.company}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">{app.role}</p>
        {expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          >
            <X />
          </button>
        )}
      </CardHeader>
      <CardContent>
        <Badge
          className={`absolute right-5 bottom-4 
            ${app.status === "Passed" ? "bg-green-600" : ""}
            ${app.status === "Interviewing" ? "bg-blue-600" : ""}
            ${app.status === "Rejected" ? "bg-red-600" : ""}
          `}
        >
          {app.status}
        </Badge>
        {expanded && (
          <div className="mt-8 text-base text-gray-700 dark:text-gray-200">
            <strong>Details:</strong> {app.details || "No additional info."}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardAppUI;
