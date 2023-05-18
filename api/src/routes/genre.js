const { Router } = require('express');
const router = Router()
const { getAllGenres } = require('../controllers/genres')

// obtenemos todos los genres guardados en nuestra db
router.get('/', async (req, res) => {
    try {
        const allGenres = await getAllGenres()
        res.status(200).json(allGenres)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router