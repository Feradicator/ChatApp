import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoutes.js'
import contactsRoutes from './routes/ContactRoutes.js'

dotenv.config()//due to this command all the environment variables will be inside process.env which has been written inside .env
const app=express();//creating instance of express
const port=process.env.PORT || 3001;
const databaseURL=process.env.DATABASE_URL;
app.use(
    cors({
        origin:[process.env.ORIGIN],
        methods:["GET","POST","PUT","PATCH","DELETE"],
        credentials:true//it is used to enable cokies
    })
);
app.use('/uploads/profiles',express.static("uploads/profiles"))

//app.use('/uploads/profiles', ...): This tells your Express application to use a specific middleware for all requests that start with /uploads/profiles.
//Essentially, any request that matches this path (e.g., /uploads/profiles/user123.jpg) will be handled by the middleware specified as the second argument.
//express.static is a built-in middleware function in Express that serves static files from the specified directory.
//When a client makes a request to http://yourserver.com/uploads/profiles/somefile.jpg, Express will look for the file somefile.jpg in the uploads/profiles directory on your server.
//If the file exists, Express will automatically serve it to the client. The client will receive the file as if it were hosted directly on the server, even though it's stored in the file system.
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/contacts",contactsRoutes)

const server=app.listen(port,()=>
{
    console.log(`Server is running at port ${port}`)
});

mongoose.connect(databaseURL).then(()=>console.log('DB connection successfull'))
.catch((err)=>console.log(err.message));
