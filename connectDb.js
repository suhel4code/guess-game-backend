import mongoose from "mongoose";

export async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Db connected");
  } catch (error) {
    console.log("Error while connecting to database", error);
    process.exit(1);
  }
}
