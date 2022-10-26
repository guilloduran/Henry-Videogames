const { API_KEY } = process.env;
const { Genre } = require('../db');

module.exports = {
  fetchGenre: async () => {
    let datos = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) =>
        data.results.map((e) => {
          return { name: e.name };
        })
      )
      .then(async (data) => {
        await Genre.bulkCreate(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  checkGenre: async () => {
    const count = await Genre.count();
    if (count === 0) {
      await module.exports.fetchGenre();
    }
  },
};
