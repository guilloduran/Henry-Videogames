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
          through: {
            attributes: [],
          },
        },
      });
      result = [...resultDb, ...resultFetch];
    }
    if (result.length > 0) {
      let newResult = result.map((e) => {
        const picked = (({
          id,
          name,
          ratings,
          platforms,
          genres,
          released,
          background_image,
        }) => ({
          id,
          name,
          ratings,
          platforms,
          genres,
          released,
          background_image,
        }))(e);
        return picked;
      });
      return newResult;
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
        through: {
          attributes: [],
        },
      },
    });
    result = [...fetchResult, ...resultDb];
    let newResult = result.map((e) => {
      const picked = (({
        id,
        name,
        ratings,
        platforms,
        genres,
        released,
        background_image,
      }) => ({
        id,
        name,
        ratings,
        platforms,
        genres,
        released,
        background_image,
      }))(e);
      return picked;
    });
    return newResult;
  },
  getVideogameById: async (id) => {
    if (id.length < 8) {
      let resultFetch = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      )
        .then((r) => r.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw new Error(error);
        });
      if (resultFetch.detail) {
        throw new Error('No existe el juego con este ID');
      } else {
        const picked = (({
          name,
          ratings,
          platforms,
          genres,
          description,
          released,
          background_image,
        }) => ({
          name,
          ratings,
          platforms,
          genres,
          description,
          released,
          background_image,
        }))(resultFetch);
        return picked;
      }
    } else {
      let resultDb = await Videogame.findByPk(id, {
        include: {
          model: Genre,
          through: {
            attributes: [],
          },
        },
      });
      if (!resultDb) {
        throw new Error('No existe el juego con este ID');
      } else {
        return resultDb;
      }
    }
  },
};
