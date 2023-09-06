import prisma from "../db";

/**
 * Get all products
 */
export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
  });
  res.status(200).json({ data: products }).send();
};

/**
 * Get a product by id
 */
export const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });
  res.status(200).json({ data: product }).send();
};

/**
 * Create a product
 */
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });
  res.status(201).json({ data: product }).send();
};

/**
 * Update a product
 */
export const updateProduct = async (req, res) => {
  const product = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.status(200).json({ data: product }).send();
};

/**
 * Delete a product
 */
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      id_belongsToId: req.user.id,
    },
  });
  res.status(200).json({ data: deleted }).send();
};
