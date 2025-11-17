import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("DB connected");
    } catch (error) {
        console.error("DB connect cause errors", error);
        process.exit(1);
    }
}