import { CatchAsync } from "../Middleware/CatchAsync";
import { logger } from "../Utils/logger";
import User from "../Models/User";


const getAllUsers = CatchAsync(async (req, res) => {

  const users = await User.find({});

  return   res.status(200).json({
        success: true,
        users,
        
    });
});

const changeAmountInWallet = CatchAsync(async (req, res) => {
  const { userId, amount } = req.body;
  console.log("✅ HIT CHANGE AMOUNT ROUTE");
console.log("BODY:", req.body);

  console.log("userId", userId);
  const user=await User.findById(userId);
  if(!user){
    return res.status(404).json({
      success:false,
      message:"User not found"
    })
  }
  user.wallet.balance=amount;
  await user.save();
  res.status(200).json({
    success:true,
    message:"Wallet updated successfully",
    balance:user.wallet.balance
  })
});


const getNormalUser = CatchAsync(async (req, res) => {
  console.log("entered here")
  const { userId } = req.query; // ✅ correct source
  console.log("params",req.params)
  console.log("query",req.query)

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID not provided",
    });
  }

  // ✅ Use findById (MongoDB _id)
  const user = await User.findById(userId).select("-password -role");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User data fetched successfully",
    user,
  });
});




export const UserController={getAllUsers,changeAmountInWallet,getNormalUser};