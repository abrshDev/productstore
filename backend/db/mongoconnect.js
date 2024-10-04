import mongoose from "mongoose";

export const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongo db connected `, conn.connection.host);
  } catch (error) {
    console.log(`error : ${error.message}`);
    process.exit(1);
  }
};
