import mongoose,{Document,model,Schema } from "mongoose"


interface User{
    name:string;
    email:string;
    password:string;
    role: "user" | "admin";
    wallet:{
        balance:number;
    },
}


const UserSchema=new Schema<User & Document>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["user","admin"],default:"user"},
    wallet:{
        balance:{type:Number,default:0}
    }
},
{
    timestamps:true
},
)

const User=model<User & Document>("User",UserSchema)
export default User;