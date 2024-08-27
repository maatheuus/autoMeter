import { connect } from "mongoose";
import app from "./app";

const uri: string = process.env.MONGO_URL as string;

if (!uri) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

async function connection() {
  try {
    await connect(uri);
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.log(error);
  }
}
connection();

const port: number = 3000;

app.listen(port, () => {
  console.log("listening on port " + port);
});
