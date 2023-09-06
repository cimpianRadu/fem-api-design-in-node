import { Router } from "express";
import { body } from "express-validator";
import prisma from "./db";
import { handleInputErrors } from "./modules/middlewares";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, getUpdateById, getUpdates, getUpdatesForUser } from "./handlers/update";

const router = Router();

/**
 * Product Routes
 */
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", body("name").isString(), handleInputErrors, updateProduct);
router.post("/product", body("name").isString().isLength({ max: 10, min: 3 }), handleInputErrors, createProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Update Routes
 */
router.get("/update", getUpdates);
router.get("/update/:id", getUpdateById);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").optional(),
  body("version").optional(),
  handleInputErrors,
  (req, res) => {}
);
router.post("/update", body("title").exists(), body("body").exists(), handleInputErrors, createUpdate);
router.delete("/update/:id", (req, res) => {});
router.get("/updatesForUser", getUpdatesForUser);

/**
 * Update Points Routes
 */
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put("/updatepoint/:id", body("name").isString().optional(), body("description").isString().optional(), handleInputErrors, (req, res) => {});
router.post("/updatepoint", body("name").isString(), body("description").isString(), body("updateId").exists().isString(), handleInputErrors, (req, res) => {});
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
