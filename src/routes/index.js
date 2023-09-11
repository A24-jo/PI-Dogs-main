const { Router } = require('express');
//los handleersd
const { handlerAddRazas, handlerNameRazas, handlerIdRazas, handlerNewDog, handlerApiTemp, handlerDeleteRazas } = require('../handlers/Handlers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
//aquie solitamos la totalidad de razas de la api
router.get('/dogs',handlerAddRazas);

//aqui solicitamos una raza por su nombre 
router.get('/dogs/name', handlerNameRazas);

router.get('/dogs/:idRaza',handlerIdRazas);


router.post('/dogs', handlerNewDog);

router.get('/temperaments',handlerApiTemp);

router.delete('/delete/:id', handlerDeleteRazas);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
