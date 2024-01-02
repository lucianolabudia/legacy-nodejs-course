const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, adminRole } = require('../middlewares');
const { createProduct, getProducts, getProductsId, updateProduct, deleteProduct } = require('../controllers/productsController');

const { categoryExistsId, productExistsId } = require('../helpers/db-validators');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', getProducts );

// Obtener una cagegoria por ID - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( productExistsId ),
    validateFields
], getProductsId );

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un id de Mongo').isMongoId(),
    check('category').custom( categoryExistsId ),
    validateFields
], createProduct );

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validateJWT,
    // check('category', 'No es un id de Mongo').isMongoId(),
    check('id').custom( productExistsId ),
    validateFields
], updateProduct );

// Borrar una categoria - Admin
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( productExistsId ),
    validateFields
], deleteProduct );


module.exports = router;
