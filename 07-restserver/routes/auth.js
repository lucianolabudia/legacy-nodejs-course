const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validateFields');


const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login );

router.post('/google', [
    check('id_token', 'El ID_Token de Google es necesario').not().isEmpty(),
    validateFields
], googleSignIn );



module.exports = router;