import { CatchAsync } from "../Middleware/CatchAsync";
import { logger } from "../Utils/logger";
import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const SignUP=CatchAsync(async(req,res)=>{
    const {name,email,password}=req.body;
    const ExistingUser= await User.findOne({email});
    if(ExistingUser){
        logger.error("User already exists with this email");
        return res.status(400).json({
            success:false,
            message:"User already exists with this email"
        });
    }

    const hashedPassword= await bcrypt.hash(password,10);
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    });
   return res.status(201).json({
        success:true,
        message:"User created successfully",
    });
     
});

const Login=CatchAsync(async(req,res)=>{
   const {email,password}=req.body;
   const user=await User.findOne({email});
    if(!user){
     logger.error("User not found with this email");
     return  res.status(404).json({
          success:false,
          message:"User not found with this email"
     });
    }
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
     logger.error("Invalid password");
     return res.status(401).json({
          success:false,
          message:"Invalid password",
          
     });
    }

    const acceessToken= await  jwt.sign(
        {
            userId:user._id,
            role:user.role
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn:"1d"
        }
    );
    res.cookie("accessToken",acceessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:24*60*60*1000,
    });
   return  res.status(200).json({
        success:true,
        message:"Login successful",
        user:{
            name:user.name,
            email:user.email,
            role:user.role,
            balance:user.wallet.balance
        }
        
    });
});

const VerifyMe = CatchAsync(async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    // optional: fetch user info from DB if you need it
    // const user = await User.findById(decoded.id).select("-password");
    console.log("l",decoded)
    
    return res.status(200).json({
      success: true,
      user: decoded, // or user from DB if you prefer
    });
  } catch (err) {
    console.error("VerifyMe error:", err);
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
});


const Logout=CatchAsync(async(req,res)=>{

  res.clearCookie("accessToken");
return res.status(200).json({
  success: true,
  message: "Logout successful",
});

});


export const AuthController= {SignUP,Login,VerifyMe,Logout};