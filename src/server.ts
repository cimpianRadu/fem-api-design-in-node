import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //  we can stop the execution of the request here, because this is above the router and we don't call next()
  // res.status(401).json({ message: "Unauthorized, stop right there" }).send();
  // return;

  req.ss_secret = "secret";
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello World Sir" }).send();
});

app.use("/api", protect, router);

app.post("/user", createUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  console.log(err);
  switch (err.type) {
    case "auth":
      res.status(401).json({ message: "Unauthorized, stop right there" }).send();
      return;
    case "input":
      res.status(400).json({ message: "Bad request" }).send();
      return;
    default:
      res.status(500).json({ message: "Something went wrong" }).send();
      return;
  }
});

export default app;
