import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const url = process.env.CONNECTION_URL || "";
        console.log(url);
        await mongoose.connect(url);
    } catch (error) {
        process.exit(1);
    }
};

export default ConnectDB;