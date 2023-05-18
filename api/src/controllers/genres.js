const { Genre } = require('../db.js')

const getAllGenres = async () => {
   const allGenres = await Genre.findAll();
   return allGenres
};


module.exports = {
    getAllGenres,
}
