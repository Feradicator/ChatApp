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
/* mongoose: This is referring to the Mongoose library, which is an ODM (Object Data Modeling) library for MongoDB and Node.js.
model(): This method is used to create a model in Mongoose. A model represents a collection in the MongoDB database.
"Users": This is the name of the MongoDB collection. Mongoose will automatically create a collection in the database with the plural form of this
 name, so in this case, the collection will be called users.
userSchema: This is the schema that defines the structure of the documents in the users collection. The schema would have been defined earlier in
 the code, specifying the fields and their types (e.g., name, email, password). */  