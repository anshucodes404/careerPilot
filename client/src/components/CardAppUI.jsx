import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

export const getStatusStyles = (status) => {
  const baseStyles = "absolute top-4 right-4";
  switch (status?.toLowerCase()) {
    case "passed":
      return `${baseStyles} bg-green-600 dark:bg-green-500 hover:bg-green-700`;
    case "interviewing":
      return `${baseStyles} bg-blue-600 dark:bg-blue-500 hover:bg-blue-700`;
    case "rejected":
      return `${baseStyles} bg-red-600 dark:bg-red-500 hover:bg-red-700`;
    default:
      return `${baseStyles} bg-neutral-600 dark:bg-neutral-500 hover:bg-neutral-700`;
  }
};

const CardAppUI = ({ app, onClick }) => {
  const formattedDate = app.appliedDate
    ? new Date(app.appliedDate).toLocaleDateString()
    : "Not specified";

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 
        hover:shadow-lg hover:border-neutral-400 dark:hover:border-neutral-600
        bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
    >
      <CardHeader className="relative">
        <Badge className={getStatusStyles(app.status)}>
          {app.status || "Unknown"}
        </Badge>

        <CardTitle className="text-xl font-semibold text-black dark:text-white">
          {app.company}
        </CardTitle>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Building className="w-4 h-4 mr-2" />
            {app.role || "Position not specified"}
          </div>

          {app.location && (
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <MapPin className="w-4 h-4 mr-2" />
              {app.location || "Location not specified"}
            </div>
          )}

          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default CardAppUI;
