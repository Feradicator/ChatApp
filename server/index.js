import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoutes.js'

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
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes)

const server=app.listen(port,()=>
{
    console.log(`Server is running at port ${port}`)
});

mongoose.connect(databaseURL).then(()=>console.log('DB connection successfull'))
.catch((err)=>console.log(err.message));
