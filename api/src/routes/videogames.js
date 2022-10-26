const { Router } = require('express');
const videogameController = require('../controllers/videogames');
const genreController = require('../controllers/genres');
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let result = await videogameController.getVideogames(name);
      res.status(200).send(result);
    }
    if (!name) {
      let result = await videogameController.getAllVideogames();
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let result = await videogameController.getVideogameById(id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  await genreController.checkGenre();
  const { name, description, platforms, genres } = req.body;
  try {
    if (!name || !description || !platforms) {
      throw new Error('te faltan datos paaa');
    }
    const nuevoJuego = await Videogame.create(req.body);
    const generos = await Genre.findAll({
      where: { name: genres },
    });
    await nuevoJuego.addGenres(generos);
    res.status(201).send(nuevoJuego);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
