const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

module.exports = {
  getVideogames: async (name) => {
    let result = [];

    if (name !== null) {
      let videogame = name.toLowerCase();
      let resultFetch = await fetch(
        `https://api.rawg.io/api/games?search=${videogame}&key=${API_KEY}`
      )
        .then((r) => r.json())
        .then((data) => {
          return data.results;
        })
        .catch((error) => {
          throw new Error(error);
        });
      let resultDb = await Videogame.findAll({
        where: {
          name: { [Op.substring]: `${videogame}` },
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
      let newResult = result.map((props) => {
        const picked = (({
          id,
          name,
          rating,
          platforms,
          genres,
          released,
          background_image,
          createdInDb,
        }) => ({
          id,
          name,
          rating,
          platforms,
          genres,
          released,
          background_image,
          createdInDb,
        }))(props);
        return picked;
      });
      return newResult;
    } else throw new Error('Game was not found!');
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
    let newResult = result.map((props) => {
      const picked = (({
        id,
        name,
        rating,
        platforms,
        genres,
        released,
        background_image,
        createdInDb,
      }) => ({
        id,
        name,
        rating,
        platforms,
        genres,
        released,
        background_image,
        createdInDb,
      }))(props);
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
          console.log(error);
          throw new Error(error);
        });

      if (resultFetch.detail) {
        throw new Error(error);
      } else {
        const picked = (({
          name,
          rating,
          platforms,
          genres,
          description_raw,
          released,
          background_image,
          createdInDb,
        }) => ({
          name,
          rating,
          platforms,
          genres,
          description_raw,
          released,
          background_image,
          createdInDb,
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
        throw new Error('No game was found with this ID!');
      } else {
        return resultDb;
      }
    }
  },
};
