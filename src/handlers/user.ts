import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.status(201).json({ token }).send();
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).json({ message: "Unauthorized, not valid credentials" }).send();
    return;
  }

  const token = createJWT(user);
  return res.status(200).json({ token }).send();
};
