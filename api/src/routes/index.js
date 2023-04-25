const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const characterRouter = require('./temperament.routes');
const dogRouter = require ('./dog.routes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs",dogRouter);

router.use("/temperaments",characterRouter);
module.exports = router;
