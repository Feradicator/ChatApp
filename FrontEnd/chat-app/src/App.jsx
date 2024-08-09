import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'

import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'


//The PrivateRoute component is a React functional component designed to protect certain routes or parts of your application, 
//ensuring that only authenticated users can access them.
//1. Props: { children } children represents the component(s) or elements nested within the PrivateRoute component when it is used. 
//These children can be any JSX that should only be rendered if the user is authenticated.
const PrivateRoute=({children})=>{
  const {userInfo}=useAppStore();
  const isAuthenticated=!!userInfo;
  return isAuthenticated?children:<Navigate to='/auth'/>
}
const App = () => {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/auth" element={<Auth/>}/>
    <Route path="*" element={<Auth/>}/>
    <Route path="/chat" element={<Chat/>}/>
    <Route path="/profile" element={<Profile/>}/>
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
