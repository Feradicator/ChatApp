import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,'Email is Required'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'Email is Required'],
           
        },
        firstName:{
            type:String,
            required:false,
           
        },
        lastName:{
            type:String,
            required:false,
           
        },
        image:{
            type:String,
            required:false,
           
        }
        ,
        color:{
            type:Number,
            required:false,
           
        },
        profileSetup:{
            type:Boolean,
            required:false,
           
        }


    }
);
userSchema.pre('save',async function(next)//pre is a type of middleware ,before saving data we will run function inside pre
{
    const salt=await genSalt();
    this.password=await hash(this.password,salt);//salt is used for encrption
    next();//it tells the server this part is completed called the next part of the code    


});
const User=mongoose.model("Users",userSchema);
export default User;