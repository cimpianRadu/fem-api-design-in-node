import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const comparePasswords = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const createJWT = (user) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Unauthorized, stop right there" }).send();
    return;
  }

  const [_, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Unauthorized, not valid token" }).send();
    return;
  }

  /**
   * We try/catch because if the token is not valid, it will throw an error
   */
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      res.status(401);
      res.json({ message: "Unauthorized, not valid token" }).send();
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json({ message: "Unauthorized, not valid token" }).send();
    return;
  }
};
