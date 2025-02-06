import mongoose from "mongoose";

const connectDb = async (): Promise<boolean> => {
  console.log(process.env.MONGODB_URI);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );

    console.log(connectionInstance.connection.name);

    return true;
  } catch (error) {
    console.log("MONGODB connection failed ", error);
    return false;
  }
};

export default connectDb;
