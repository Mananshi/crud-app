const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')
const {getAllProducts, getProductById, addNewProduct, deleteProduct, updateProduct, sortedProducts, getName, addCandP} = require('../controllers/product')
const {getAllCategories, addNewCategoryandProducts, deleteCategory} = require('../controllers/category');

const prisma = new PrismaClient();

//Routes for Products
router.get('/products', getAllProducts);
router.get('/products-sorted', sortedProducts);
router.get('/products/:id', getProductById);
router.post('/products', addNewProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id', updateProduct);
router.get('/products-name/:name', getName);
router.post('/products-new', addCandP);

//Routes for Categories
router.get('/category', getAllCategories);
router.post('/category', addNewCategoryandProducts);
// router.post('/category-product', addNewCategoryandProducts);
router.delete('/category/:id', deleteCategory);

module.exports = router;
