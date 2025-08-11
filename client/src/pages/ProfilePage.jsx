import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"


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
import EditProfile from '../components/EditProfile'
import { Button } from '../components/ui/button'


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
    <div className="min-h-screen">
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
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              )}

              <div className="absolute">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>

              <Button
                variant="outline"
                className="bg-white/90 hover:bg-white text-slate-800 border-white/20 "
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>

              <EditProfile
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                profileData={profileData}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-8 -mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Completeness Bar */}
          <Card className="mb-6 shadow-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
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
            <Card className="lg:col-span-2 shadow-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                  <Briefcase className="w-5 h-5" />
                  <span>Professional & Contact Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location & Availability */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
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
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
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
                        className="flex items-center space-x-2 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800/70 transition-colors"
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
                        className="flex items-center space-x-2 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800/70 transition-colors"
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
                        className="flex items-center space-x-2 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800/70 transition-colors"
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
                        className="flex items-center space-x-2 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800/70 transition-colors"
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
            <Card className="shadow-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
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
