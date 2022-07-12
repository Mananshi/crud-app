const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


const getAllProducts = async (req, res, next) => {
  try{
    const products = await prisma.product.findMany({
      include:{
        category: true
      }
    });
    res.json(products)
  } catch(error){
    next(error)
  }
};


const getProductById = async (req, res, next) => {
  try{
    const {id} = req.params
    const product = await prisma.product.findUnique({
      where:{
        id: Number(id)
      },
      include: {
        category: true
      }
    })
    res.json(product)
  } catch(error){
    next(error);
  }
};

const addNewProduct = async (req, res, next) => {
  try{
    const product = await prisma.product.create({
      data: req.body,
    })
    res.json(product);
  } catch(error){
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try{
    const {id} = req.params
    const deletedProduct = await prisma.product.delete({
      where:{
        id: parseInt(id)
      }
    })
    res.json(deletedProduct)
  } catch(error){
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try{
    const {id} = req.params
    const product = await prisma.product.update({
      where:{
        id: parseInt(id),
      },
      data: req.body,
      include: {
        category: true
      }
    })
    res.json(product);
  } catch(error){
    next(error);
  }
};



module.exports = {getAllProducts, getProductById, addNewProduct, deleteProduct, updateProduct}