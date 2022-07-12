const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const getAllCategories = async (req, res, next) => {
  try{
    const categories = await prisma.category.findMany({
      include:{
        products: true
      }
    })
    res.json(categories)
  } catch(error){
    next(error)
  }
};

// const addNewCategory = async (req, res, next) => {
//   try{
//     const category = await prisma.category.create({
//       data: req.body,
//     })
//     res.json(category);
//   } catch(error){
//     next(error);
//   }
// };


const addNewCategoryandProducts = async (req, res, next) => {
  try{
    const categories = await prisma.category.findMany({
      include:{
        category: true
      }
    });
    res.json(categories)
  } catch(error){
    next(error)
  }
};


const deleteCategory = async (req, res, next) => {
  try{
    const {id} = req.params
    const deletedCategory = await prisma.category.delete({
      where:{
        id: parseInt(id)
      }
    })
    res.json(deletedCategory)
  } catch(error){
    next(error);
  }
};


module.exports = {getAllCategories, addNewCategoryandProducts, deleteCategory}