import React, {useState} from 'react'
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  MapPin,
  Briefcase,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Twitter,
  Edit3,
  CheckCircle,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {Badge} from "./ui/badge"

const EditProfile = ({ isEditing, setIsEditing, profileData, setProfileData}) => {
  const [editForm, setEditForm] = useState(profileData);
  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setEditForm((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSave = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };
  return (
    <>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hidden">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editForm.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, Country"
              />
            </div>

            {/* Preferred Roles */}
            <div>
              <Label>Preferred Job Roles</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {editForm.preferredRoles.map((role, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
              <Input
                className="mt-2"
                placeholder="Add new role (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleInputChange("preferredRoles", [
                      ...editForm.preferredRoles,
                      e.target.value.trim(),
                    ]);
                    e.target.value = "";
                  }
                }}
              />
            </div>

            {/* Availability */}
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Select
                value={editForm.availability}
                onValueChange={(value) =>
                  handleInputChange("availability", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Actively seeking internship">
                    Actively seeking internship
                  </SelectItem>
                  <SelectItem value="Open to offers">Open to offers</SelectItem>
                  <SelectItem value="Not looking">Not looking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Social Links */}
            <div>
              <Label>Social Links</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4 text-slate-600" />
                  <Input
                    value={editForm.socialLinks.github}
                    onChange={(e) =>
                      handleSocialLinkChange("github", e.target.value)
                    }
                    placeholder="GitHub URL"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <Input
                    value={editForm.socialLinks.linkedin}
                    onChange={(e) =>
                      handleSocialLinkChange("linkedin", e.target.value)
                    }
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-green-600" />
                  <Input
                    value={editForm.socialLinks.portfolio}
                    onChange={(e) =>
                      handleSocialLinkChange("portfolio", e.target.value)
                    }
                    placeholder="Portfolio URL"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Twitter className="w-4 h-4 text-sky-500" />
                  <Input
                    value={editForm.socialLinks.twitter}
                    onChange={(e) =>
                      handleSocialLinkChange("twitter", e.target.value)
                    }
                    placeholder="Twitter/X URL"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <Label>Primary Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {editForm.primarySkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <Input
                className="mt-2"
                placeholder="Add new skill (press Enter)"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleInputChange("primarySkills", [
                      ...editForm.primarySkills,
                      e.target.value.trim(),
                    ]);
                    e.target.value = "";
                  }
                }}
              />
            </div>

            {/* Experience */}
            <div>
              <Label htmlFor="experience">Experience/Education</Label>
              <Input
                id="experience"
                value={editForm.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                placeholder="e.g., B.Tech 2nd Year"
              />
            </div>

            {/* Current Goal */}
            <div>
              <Label htmlFor="currentGoal">Current Goal</Label>
              <Textarea
                id="currentGoal"
                value={editForm.currentGoal}
                onChange={(e) =>
                  handleInputChange("currentGoal", e.target.value)
                }
                placeholder="e.g., Cracking Internship by Dec 2025"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile