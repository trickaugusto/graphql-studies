import mongoose from "mongoose";

const user = process.env.USER_MONGO;
const password = process.env.PASS_MONGO;
const database = process.env.DB_MONGO;

mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0.xdzew8d.mongodb.net/${database}?retryWrites=true&w=majority`
);
