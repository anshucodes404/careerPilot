import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

import { Separator } from "../components/ui/separator"
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
  Phone
} from 'lucide-react'
import { SignedIn, UserButton } from '@clerk/clerk-react'
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

const ProfilePage = () => {

  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    location: 'KIIT',
    preferredRoles: ['Frontend Developer', 'React Developer', 'UI/UX Designer'],
    availability: 'Actively seeking internship',
    socialLinks: {
      github: 'https://github.com/anshucodes404',
      linkedin: 'https://linkedin.com/in/anshucodes404-found',
      portfolio: 'https://portfolio.com',
      twitter: 'https://twitter.com/username'
    },
    primarySkills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
    experience: 'B.Tech 2nd Year',
    currentGoal: 'Cracking Internship by Dec 2025'
  })

  const [editForm, setEditForm] = useState(profileData)

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSocialLinkChange = (platform, value) => {
    setEditForm(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }))
  }

  const handleSave = () => {
    setProfileData(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profileData)
    setIsEditing(false)
  }

  const calculateProfileCompleteness = () => {
    const fields = [
      profileData.location,
      profileData.preferredRoles.length,
      profileData.availability,
      Object.values(profileData.socialLinks).some(link => link),
      profileData.primarySkills.length,
      profileData.experience,
      profileData.currentGoal
    ]
    
    const filledFields = fields.filter(field => 
      field && (Array.isArray(field) ? field.length > 0 : field.trim !== '') //field && is used here to check whether the field is not empty, undefined, null
    ).length
    
    return Math.round((filledFields / fields.length) * 100)
  }

  const profileCompleteness = calculateProfileCompleteness()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Banner */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-8 right-8">
          <div className="flex items-end justify-between">
            <div className="flex items-end space-x-4">
              <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-800 shadow-lg">
                <img
                  src={user?.imageUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-2">
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-blue-100 text-lg">
                  {profileData.preferredRoles[0]}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {user?.primaryEmailAddress?.verified && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              )}

              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/90 hover:bg-white text-slate-800 border-white/20"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
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
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
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
                          <SelectItem value="Open to offers">
                            Open to offers
                          </SelectItem>
                          <SelectItem value="Not looking">
                            Not looking
                          </SelectItem>
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
                              handleSocialLinkChange(
                                "portfolio",
                                e.target.value
                              )
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
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-8 -mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Completeness Bar */}
          <Card className="mb-6 shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Profile Completeness
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {profileCompleteness}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${profileCompleteness}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Professional & Contact Details */}
            <Card className="lg:col-span-2 shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <Briefcase className="w-5 h-5" />
                  <span>Professional & Contact Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location & Availability */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Location
                      </p>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {profileData.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Availability
                      </p>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {profileData.availability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preferred Roles */}
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Preferred Job Roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferredRoles.map((role, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Social Links
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {profileData.socialLinks.github && (
                      <a
                        href={profileData.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          GitHub
                        </span>
                      </a>
                    )}
                    {profileData.socialLinks.linkedin && (
                      <a
                        href={profileData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          LinkedIn
                        </span>
                      </a>
                    )}
                    {profileData.socialLinks.portfolio && (
                      <a
                        href={profileData.socialLinks.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Globe className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Portfolio
                        </span>
                      </a>
                    )}
                    {profileData.socialLinks.twitter && (
                      <a
                        href={profileData.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-sky-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Twitter/X
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Identity Section */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <User className="w-5 h-5" />
                  <span>Career Identity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Skills */}
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Primary Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.primarySkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Experience/Education */}
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Experience
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200">
                    {profileData.experience}
                  </p>
                </div>

                <Separator />

                {/* Current Goal */}
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Current Goal
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                    {profileData.currentGoal}
                  </p>
                </div>

                <Separator />

                {/* Contact Info */}
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                      <Mail className="w-4 h-4" />
                      <span>{user?.emailAddresses[0]?.emailAddress}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Member since{" "}
                        {new Date(user?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage
