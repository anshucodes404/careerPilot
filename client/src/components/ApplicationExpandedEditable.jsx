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
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useApplication } from "../context/applicationContext";

const ApplicationExpandedEditable = ({ application, onClose }) => {
  const [formData, setFormData] = React.useState({
    _id: application?._id || "",
    company: application?.company || "",
    role: application?.role || "",
    location: application?.location || "",
    status: application?.status || "Applied",
    mode: application?.mode || "Online",
    resume: application?.resume || "v1",
    notes: application?.notes || "",
    appliedDate:
      application?.appliedDate || new Date().toISOString().split("T")[0],
    description: application?.description || "",
  });

  const { editApplication, setExpandedIdx, setClickedIdx } = useApplication();

  const onSave = (e) => {
    e.preventDefault();
    editApplication(formData);
    setExpandedIdx(null);
    setClickedIdx(null);
  };

  return (
    <Card className="w-[90vw] h-[70vh] overflow-y-auto scrollbar-hidden max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <CardHeader className="relative pb-2">
        <CardTitle className="text-2xl font-bold text-black dark:text-white">
          Edit Application
        </CardTitle>
      </CardHeader>

      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

      <CardContent className="pt-6">
        <form onSubmit={onSave} className="space-y-6">
          {/* Main Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="bg-neutral-50 dark:bg-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="bg-neutral-50 dark:bg-neutral-800"
              />
            </div>
          </div>

          {/* Location and Dates */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="bg-neutral-50 dark:bg-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Applied Date</Label>
              <Input
                type="date"
                value={formData.appliedDate}
                onChange={(e) =>
                  setFormData({ ...formData, appliedDate: e.target.value })
                }
                className="bg-neutral-50 dark:bg-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-neutral-50 dark:bg-neutral-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Passed">Passed</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select
                value={formData.mode}
                onValueChange={(value) =>
                  setFormData({ ...formData, mode: value })
                }
              >
                <SelectTrigger className="bg-neutral-50 dark:bg-neutral-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Resume</Label>
              <Select
                value={formData.resume}
                onValueChange={(value) =>
                  setFormData({ ...formData, resume: value })
                }
              >
                <SelectTrigger className="bg-neutral-50 dark:bg-neutral-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">Version 1</SelectItem>
                  <SelectItem value="v2">Version 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="bg-neutral-50 dark:bg-neutral-800 min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplicationExpandedEditable;
