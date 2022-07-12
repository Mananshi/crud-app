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
        id: parseInt(id)
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

const getName = async (req, res, next) => {
  try{
    const {name} = req.params
    const product = await prisma.product.findUnique({
      where: {
        name: name,
      },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
      },
    })
    res.json(product);
  } catch(error){
    next(error)
  }
};

const sortedProducts = async (req, res, next) => {
  try{
    const products = await prisma.product.findMany({
      orderBy:[
        {
          name: 'asc'
        }
      ],
      include:{
        category: true,
      }
    })
    res.json(products);
  } catch(error){
    next(error);
  }
};

const addCandP = async (req, res, next) => {
  try{
        
  } catch(error){
    
  }
};



module.exports = {getAllProducts, getProductById, addNewProduct, deleteProduct, updateProduct, getName, sortedProducts, addCandP}