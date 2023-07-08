const { Router } = require('express');
const { userGet, userPost, userDelete, userPatch, userPut } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldsValidator');
const { validateRole, emailValidator, mongoIdValidator } = require('../helpers/db-validators');

const router = Router();


    router.get('/', userGet );

    // despues de la ruta, los dos puntos ":" indican los paramentros

    // El midleware es una funcion que se ejectua antes de que continue el flujo de la ruta, es por ello que puede ser usado como validadores en los metodos http
    router.put('/:id',[
        check('id','ID invalido').isMongoId(),
        check('id').custom( mongoIdValidator ),
        check('role').custom( validateRole ),
        fieldValidator
    ],userPut);
    
    router.post('/', [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('password','El password debe ser mas de 6 caracteres').isLength({ min: 6 }),
        check('email', 'El correo no es un correo valido').isEmail(),
        check('email').custom( emailValidator ),
        //check('role','No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
        check('role').custom( validateRole ),
        fieldValidator
    ]  ,userPost);

    router.delete('/:id', [
        check('id','ID invalido').isMongoId(),
        check('id').custom( mongoIdValidator ),
        fieldValidator
    ] ,userDelete);

    router.patch('/',userPatch);



module.exports = router;