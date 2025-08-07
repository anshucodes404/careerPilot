import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

const ProfilePage = () => {
  const { user } = useUser()
  console.log(user)

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Hello {user.username}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your profile and view your progress
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1 shadow-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
                <img
                  src={user?.imageUrl || '/default-avatar.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-black dark:text-white">
                {user?.firstName} {user?.lastName}
              </CardTitle>
              <p className="text-neutral-600 dark:text-neutral-400">{user?.emailAddresses[0].emailAddress}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge className="w-full justify-center py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700">
                {user?.primaryEmailAddress?.verified ? "Verified Account" : "Unverified Account"}
              </Badge>
              <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Stats & Progress */}
          
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
