const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/fieldsValidator');



const router = Router();

router.post('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es invalido').not().isEmpty(),
    fieldValidator
],login);



module.exports = router;