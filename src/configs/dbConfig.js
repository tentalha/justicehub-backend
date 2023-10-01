import mongoose from "mongoose";
import { DB_URI } from "./envConfig";

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", (err) => console.log("mongoDB connection error. ==>" + err));
