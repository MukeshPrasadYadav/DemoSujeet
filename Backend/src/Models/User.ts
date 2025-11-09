import mongoose,{Document,model,Schema } from "mongoose"


interface User{
    countryCode:string,
    name:string;
    phone:string;
    email:string;
    password:string;
    confirmPassword:string;
    role: "user" | "admin";
    wallet:{
        balance:number;
    },
    createdAt:Date
}


const UserSchema=new Schema<User & Document>({
    countryCode:{type:String,required:true},
    phone:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    role:{type:String,enum:["user","admin"],default:"admin"},
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