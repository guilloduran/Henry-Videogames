const { Router } = require('express');
const genreController = require('../controllers/genres');
const { Genre } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {
  try {
    await genreController.checkGenre();
    res.status(200).send(await Genre.findAll());
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
