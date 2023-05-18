const { Router } = require('express');
const genreRouter = require('./genre')
const videogamesRouter = require('./videogame')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', genreRouter)
router.use('/videogames', videogamesRouter)

module.exports = router;
