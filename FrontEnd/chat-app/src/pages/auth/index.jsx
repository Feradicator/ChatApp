import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'

import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { apiCliet } from '../../lib/api-client'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../utils/constants'
import {useNavigate} from "react-router-dom"
import { useAppStore } from '../../store'
const Auth = () => {
    const {setUserInfo}=useAppStore();
    const navigate=useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const validateLogin=()=>
    {
        if(!email.length)
            {
                toast.error("Email is Required")
                return false;
            }
            else if(!password.length)
                {
                    toast.error("Password is Required")
                    return false;
                }
            
           
            else 
            return true;

    }
    const validateSignup=()=>{
        if(!email.length)
        {
            toast.error("Email is Required")
            return false;
        }
        else if(!password.length)
            {
                toast.error("Password is Required")
                return false;
            }
        else if(!password.length)
            {
                    toast.error("Password is Required")
                    return false;
            }
        else if(!confirmPassword.length)
        {
            toast.error("Confirm your password")
            return false;
        }
        else if(password!=confirmPassword)
        {
                toast.error("password are not matching")
                return false;
        }
        else 
        return true;

    }
    const handleSignup=async ()=>
    {
        if(validateSignup())
        {
           const response=await apiCliet.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
           //1. { email, password } This object is the request body that will be sent with the POST request.
           // It contains the user credentials—email and password. In a sign-up request, these fields typically represent the user's email 
           //and password that they want to use for creating an account.
           //2.withCredentials: true indicates that the request should be sent with credentials such as cookies, authorization headers, or TLS
           // client certificates. This is often used when making requests to a server that requires authentication and needs to maintain the user's 
           //session across requests.
           if(response.status===201)
            {
                setUserInfo(response.data.user);
                navigate("/profile")
            }
           console.log({response})
        }


    };
    const handleLogin=async ()=>
    {
        if(validateLogin())
        {
            const response=await apiCliet.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
            if(response.data.user.id)
                {
                    setUserInfo(response.data.user);
                    if(response.data.user.profileSetup)
                    navigate("/chat")
                    else
                    navigate("/profile")

                }
               console.log({response})
            
        }
    };
  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 '>
            <div className='flex flex-col gap-10 items-center justify-center'>
                <div className='flex items-center justify-center flex-col'>
                    <div className='flex items-center justify-center'></div>
                    <h1 className='text-5xl font-bold md:text-6xl '>
                        Welcome
                    </h1>

                </div>
                <p>Login</p>

            </div>
            <div className="flex items-center justify-center w-full" >
                <Tabs className='w-3/4' defaultValue='login'>
                    <TabsList className='bg-transparent rounded-none w-full'>
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">SignUp</TabsTrigger>

                    </TabsList>
                    <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                        <Input placeholder="Email" value={email} type="email" className="rounded-full p-6" onChange={(e)=>setemail(e.target.value)}/>
                        <Input placeholder="Password" value={password} className="rounded-full p-6" type="password" onChange={(e)=>setpassword(e.target.value)}/>
                        <Button className='rounded-full p-6' onClick={handleLogin}> Login</Button>
                        
                    </TabsContent>
                    <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                    <Input placeholder="Email" value={email} type="email" className="rounded-full p-6" onChange={(e)=>setemail(e.target.value)}/>
                        <Input placeholder="Password" value={password} className="rounded-full p-6" type="password" onChange={(e)=>setpassword(e.target.value)}/>
                        <Input placeholder="Confirm Password" value={confirmPassword} className="rounded-full p-6" type="password" onChange={(e)=>setconfirmPassword(e.target.value)} />
                        <Button className='rounded-full p-6' onClick={handleSignup}>SignUp</Button>
                    </TabsContent>
                </Tabs>
            </div>
       
        </div>
      
    </div>
  )
}

export default Auth
