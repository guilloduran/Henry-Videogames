const { Router } = require('express');
const videogameController = require('../controllers/videogames');
const genreController = require('../controllers/genres');
const { Videogame, Genre } = require('../db');

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
    res.status(400).send((error.message = 'No game was found with this ID!'));
  }
});

router.post('/', async (req, res) => {
  await genreController.checkGenre();
  const { name, description_raw, platforms, genres, rating } = req.body;

  const str = name;
  const arr = str.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');

  let found = await Videogame.findAll({ where: { name: str2 } });
  console.log(found);
  if (found.length > 0) {
    return res.status(400).send('That game already exists!');
  }
  try {
    if (
      !name ||
      !description_raw ||
      !platforms.length ||
      !genres.length ||
      !rating
    ) {
      throw new Error('Game was not added, please provide the required data!');
    }

    const nuevoJuego = await Videogame.create(req.body);
    const generos = await Genre.findAll({
      where: { name: genres },
    });
    await nuevoJuego.addGenres(generos);
    res.status(201).send('Game succesfully added.');
  } catch (error) {
    res
      .status(404)
      .send('Game was not added! Please  verify the data you provided.');
  }
});

module.exports = router;
