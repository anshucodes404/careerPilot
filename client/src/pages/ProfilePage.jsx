import React from 'react'
import { useUser } from '@clerk/clerk-react'
const ProfilePage = () => {

    const {user} = useUser();

  return (
    <div>
      <h1>Welcome, {user?.firstName}!!</h1>
    </div>
  )
}

export default ProfilePage
