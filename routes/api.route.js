const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')
const {getAllProducts, getProductById, addNewProduct, deleteProduct, updateProduct, upsertExample, sortedProducts, getName, cAndP} = require('../controllers/product')
const {getAllCategories, addNewCategoryandProducts, deleteCategory, addNewCategory} = require('../controllers/category');

const prisma = new PrismaClient();

//Routes for Products
router.get('/products', getAllProducts);
router.get('/products-sorted', sortedProducts);
router.get('/products/:id', getProductById);
router.post('/products', addNewProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id', updateProduct);
router.get('/products-name/:productName', getName);
router.get('/products-upsert', upsertExample);
router.post('/products-c', cAndP)

//Routes for Categories
router.get('/category', getAllCategories);
router.post('/category', addNewCategory);
router.post('/category-product', addNewCategoryandProducts);
router.delete('/category/:id', deleteCategory);

module.exports = router;
