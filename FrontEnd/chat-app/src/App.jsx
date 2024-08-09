import React, { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'

import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import { apiCliet } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'


//The PrivateRoute component is a React functional component designed to protect certain routes or parts of your application, 
//ensuring that only authenticated users can access them.
//1. Props: { children } children represents the component(s) or elements nested within the PrivateRoute component when it is used. 
//These children can be any JSX that should only be rendered if the user is authenticated.
const PrivateRoute=({children})=>{
  const {userInfo}=useAppStore();
  const isAuthenticated=!!userInfo;//Applying ! twice (!!) will convert any value to its boolean equivalent If userInfo is truthy (i.e., it exists and is not null, undefined, etc.), !!userInfo will evaluate to true, meaning the user is authenticated.
  return isAuthenticated?children:<Navigate to='/auth'/>
}
const AuthRoute=({children})=>{
  const {userInfo}=useAppStore();
  const isAuthenticated=!!userInfo;//Applying ! twice (!!) will convert any value to its boolean equivalent If userInfo is truthy (i.e., it exists and is not null, undefined, etc.), !!userInfo will evaluate to true, meaning the user is authenticated.
  return isAuthenticated?<Navigate to='/chat'/>:children
}
const App = () => {
  const {userInfo,setUserInfo}=useAppStore();
  const {loading,setLoading}=useState(true);
  useEffect(()=>
  {
    const getUserData=async()=>
    {
      try{
        const response=await apiCliet.get(GET_USER_INFO,
          {
            withCredentials:true
          }
        )
      }
      catch(error)
      {
        console.log(error);
      }

    }
    if(!userInfo)
    {
      getUserData()
    }
    else{
        setLoading(false)
    }
  },[userInfo,setUserInfo])
  if(loading)
  {
    return <div>Loading...</div>
  }

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/auth" element={
      <AuthRoute>
      <Auth/>
      </AuthRoute>
      
      }/>
    <Route path="*" element={<Auth/>}/>
    <Route path="/chat" element={
      <PrivateRoute>
        <Chat/>

      </PrivateRoute>}/>
    <Route path="/profile" element={<Profile/>}/>
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
