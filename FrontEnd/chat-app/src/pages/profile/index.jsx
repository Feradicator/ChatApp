import React from 'react'
import { useAppStore } from '../../store'

const Profile = () => {
  const {userInfo}=useAppStore();
  console.log(userInfo)
  return (
    <div>
      <div>Profile</div>
      <div>
      {userInfo.email}
      </div>
      <div>
      {userInfo.id}
      </div>
     
      
    </div>
  )
}

export default Profile
