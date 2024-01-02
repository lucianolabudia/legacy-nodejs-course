const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, adminRole } = require('../middlewares');
const { createCategory, getCategories, getCategoriesId, updateCategory, deleteCategory } = require('../controllers/categoriesController');
const { categoryExistsId } = require('../helpers/db-validators');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories );

// Obtener una cagegoria por ID - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( categoryExistsId ),
    validateFields
], getCategoriesId );

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory );

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( categoryExistsId ),
    validateFields
], updateCategory );

// Borrar una categoria - Admin
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( categoryExistsId ),
    validateFields
], deleteCategory );


module.exports = router;
