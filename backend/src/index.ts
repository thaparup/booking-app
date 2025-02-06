import dotenv from "dotenv";
import { app } from "./app";
import connectDb from "./db/index";
import dotenvx from "@dotenvx/dotenvx";
dotenv.config({
  path: ".env",
});
dotenvx.config();
const configs = {
  api: process.env.api,
};
console.log(configs);
console.log(process.env.CORS_ORIGIN);
connectDb()
  .then((result) => {
    if (result === true) {
      app.listen(process.env.PORT || 6000, () => {
        console.log(`Server is running on port ${process.env.PORT || 6000}`);
      });
    }
  })
  .catch((error) => {
    console.error("MONGO db connection failed !!! ", error);
    process.exit(1);
  });
