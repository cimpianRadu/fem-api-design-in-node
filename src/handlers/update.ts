import prisma from "../db";

/**
 * Get all updates
 */
export const getUpdates = async (req, res) => {
  const updates = await prisma.update.findMany({
    where: {
      productId: req.params.productId,
    },
  });
  res.status(200).json({ data: updates }).send();
};

/**
 * Get an update by id
 */
export const getUpdateById = async (req, res) => {
  console.log("the req is: ", req);
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: update }).send();
};

/**
 * Create an update
 */
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.status(404).json({ data: "Product not found" }).send();
    return;
  }
  const updateCreated = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      productId: req.body.productId,
    },
  });
  res.status(201).json({ data: updateCreated }).send();
};

/**
 * Get updates for a user with many products
 */
export const getUpdatesForUser = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((accIntialContainer, currItemInArray) => {
    return [...accIntialContainer, ...currItemInArray.updates];
  }, []);

  res.status(200).json({ data: updates }).send();
};

/**
 * Update an update
 */
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((accIntialContainer, currItemInArray) => {
    return [...accIntialContainer, ...currItemInArray.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.status(404).json({ data: "Update not found" }).send();
    return;
  }

  const updateUpdated = await prisma.update.update({
    where: {
      id: req.bodt.id,
    },
    data: {
      title: req.body.title,
      body: req.body.body,
    },
  });
  res.status(200).json({ data: updateUpdated }).send();
};
