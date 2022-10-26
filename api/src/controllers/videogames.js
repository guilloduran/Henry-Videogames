const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

module.exports = {
  getVideogames: async (name) => {
    let result = [];
    if (name !== null) {
      let resultFetch = await fetch(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
      )
        .then((r) => r.json())
        .then((data) => {
          return data.results.slice(0, 15);
        })
        .catch((error) => {
          throw new Error(error);
        });

      let resultDb = await Videogame.findAll({
        where: {
          name: { [Op.substring]: `${name}` },
        },
        include: {
          model: Genre,
        },
      });
      result = [...resultDb, ...resultFetch];
    }
    if (result.length > 0) {
      return result;
    } else throw new Error('No existe el juego buscado');
  },

  getAllVideogames: async () => {
    let result = [];
    let fetchResult = [];
    for (let index = 1; index < 6; index++) {
      let dataFetch = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${index}`
      )
        .then((r) => r.json())
        .then((data) => {
          return data.results;
        })
        .catch((error) => {
          throw new Error(error);
        });
      fetchResult = [...fetchResult, ...dataFetch];
    }
    let resultDb = await Videogame.findAll({
      include: {
        model: Genre,
      },
    });
    result = [...fetchResult, ...resultDb];
    return result;
  },
  getVideogameById: async (id) => {
    let result = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    )
      .then((r) => r.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    if (result.detail) {
      throw new Error('No existe el juego con este ID');
    } else {
      return result;
    }
  },
};
