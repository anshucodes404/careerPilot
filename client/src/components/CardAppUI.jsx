import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const CardAppUI = ({ app }) => {
  return (
    <>
      <Card className="cursor-pointer dark:bg-muted hover:shadow-lg transition min-w-[250px] relative">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{app.company}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">{app.role}</p>
        </CardHeader>
        <CardContent>
          <Badge
            className={`absolute right-5 bottom-4 
              ${app.status == "Passed" ? "bg-green-600" : ""}
              ${app.status == "Interviewing" ? "bg-blue-600" : ""}
              ${app.status == "Rejected" ? "bg-red-600" : ""}
              `}
          >
            {app.status}
          </Badge>
        </CardContent>
      </Card>
    </>
  );
};

export default CardAppUI;
