import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(`MongoDB connection error: `, error);
  }
};

export default dbConnection;
