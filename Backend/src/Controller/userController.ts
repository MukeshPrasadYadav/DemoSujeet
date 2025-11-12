import { CatchAsync } from "../Middleware/CatchAsync";
import { logger } from "../Utils/logger";
import User from "../Models/User";
import History from "../Models/History";


const getAllUsers = CatchAsync(async (req, res) => {

  const users = await User.find({});

  return   res.status(200).json({
        success: true,
        users,
        
    });
});



const changeAmountInWallet = CatchAsync(async (req, res) => {
  const { userId, amount, profit, loss } = req.body;

  console.log("✅ HIT CHANGE AMOUNT ROUTE");
  console.log("BODY:", req.body);

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Safely update numeric fields
  if (typeof amount === "number") user.wallet.balance = amount;
  if (typeof profit === "number") user.profit.balance = profit;
  if (typeof loss === "number") user.loss.balance = loss;

  await user.save();

  
  const history = new History({
    userID: userId, 
    amount: amount || 0,
    profit: profit || 0,
    loss: loss || 0,
  });

  await history.save();

  return res.status(200).json({
    success: true,
    message: "Wallet, profit, and loss updated successfully",
    user,
  });
});

export default changeAmountInWallet;


const UpdateUser = CatchAsync(async (req, res) => {
  // 👇 Safely cast query params to the expected types
  const { userId, images } = req.query as {
    userId?: string;
    images?: string | string[];
  };

  // Validate userId
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID not provided",
    });
  }

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // ✅ Safely handle image(s)
  if (images) {
    const newImages = Array.isArray(images)
      ? images
      : [images.toString()]; // <-- ensures string type
    user.images.push(...newImages);
  }

  // Save user
  await user.save();

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
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

const AddToHistory=CatchAsync(async(req,res)=>{
  const {userId,amount,profit,loss}=req.body;

})

const getHistory=CatchAsync(async(req,res)=>{
  const history= await History.find({});
  return res.status(200).json({history});
})




export const UserController={getAllUsers,changeAmountInWallet,getNormalUser,UpdateUser,getHistory};