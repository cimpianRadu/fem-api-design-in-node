/**
 * We need to do this in order to load the environment variables, as first thing
 * After that we can use it as process.env.VARIABLE_NAME
 */
import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
