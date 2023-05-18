const { Router } = require('express');
const router = Router()
const { getVideoGames, getGameById, getGamesByName, createGame } = require('../controllers/videogames');

// obtenemos todos los videogames, tanto de nuestra db como los de la API
router.get('/', async (req,res) => {
    const name = req.query.name;
    try {
        if (name) {
            const allVideogamesByName = await getGamesByName(name);

            res.status(200).json(allVideogamesByName);
            return;
        }
        const allVideoGames = await getVideoGames()
        res.status(200) .json(allVideoGames)
    } catch (error) {
        res.status(500).json(error)
    }
})

// obtenemos UN videogame por id. Busca en nuestra db, en caso de no encontrar
// ahi, busca en API.
router.get('/:idVideogame', async (req,res) => {
    const id = req.params.idVideogame
    try {
        const gameById = await getGameById(id)
        res.status(200).json(gameById)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async (req,res) => {
    const { name, description, platforms, image, year_start, rating, genres } = req.body
    try {
        const gameCreated = await createGame(name, description,platforms, image, year_start, rating, genres)
        res.status(200).json(gameCreated)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;