import React from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {userInfo,setUserInfo}=useAppStore();
  const navigate=useNavigate();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setselectedColor] = useState(0)
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
