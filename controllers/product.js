const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: { deleted: false },
      select: {
        category: { select: { id: true, name: true } }
      }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        category: true
      }
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const addNewProduct = async (req, res, next) => {
  try {
    // const product = await prisma.product.create({
    //   data: req.body
    // });
    await upsertProduct(-1, req.body);

    res.json("Product added");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.update({
      where: {
        id: parseInt(id)
      },
      data: { deleted: true }
    });
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // await prisma.product.update({
    //   where: {
    //     id: parseInt(id)
    //   },
    //   data: req.body
    // });

    await upsertProduct(id, req.body);

    res.json("Product updated");
  } catch (error) {
    next(error);
  }
};

const sortedProducts = async (req, res, next) => {
  try {
    let { name } = req.query.name;

    const products = await prisma.product.findMany({
      where: { name: { contains: name, mode: "insensitive" } }
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const upsertExample = async (req, res, next) => {
  try {
    const upsertProduct = await prisma.product.upsert({
      where: {
        nameP: "vase"
      },
      update: {
        price: 450
      },
      create: {
        nameP: "vase",
        price: 450,
        categoryId: 2
      }
    });

    res.json(upsertProduct);
  } catch (error) {
    next(error);
  }
};

const upsertProduct = async (id, data) => {
  try {
    await prisma.product.upsert({
      where: { id: parseInt(id) },
      update: data,
      create: data
    });
  } catch (error) {
    console.log(error);
  }
};

const getName = async (req, res, next) => {
  try {
    const { productName } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        nameP: productName
      },
      select: {
        id: true,
        nameP: true,
        price: true,
        category: true
      }
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const cAndP = async (req, res, next) => {
  try {
    /* 
    {
      categoryName: 'phones',
      products: [
        {
          name: 'noting'
        }
      ]
    }
    */

    await prisma.category.create({
      data: {
        name: req.body.categoryName,
        products: { createMany: req.body.products }
      }
    });

    // Scrapping following code
    const newC = await prisma.product.create({
      data: req.body
    });
    const newP = await prisma.product.createMany({
      data: [
        (nameP = req.body.product.nameP),
        (categoryId = req.body.product.categoryId),
        (price = req.body.product.price),
        (quantity = req.body.product.quantity)
      ]
    });

    res.json(newC, newP);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProduct,
  updateProduct,
  getName,
  sortedProducts,
  upsertExample,
  cAndP
};