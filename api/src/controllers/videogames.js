const { Videogame, Genre } = require('../db.js')
const { API_KEY, API_URL } = process.env
const axios = require ('axios')
const { Op } = require('sequelize')


// traemos los games de la DB y API.
const getVideoGames = async () => {
    try {
        const allDBVideoGames = await Videogame.findAll();

        const apiFirstCall = await axios.get(`${API_URL}/games?page=${1}&key=${API_KEY}`);
        const apiSecondCall = await axios.get(`${API_URL}/games?page=${2}&key=${API_KEY}`);
        const apiThirdCall = await axios.get(`${API_URL}/games?page=${3}&key=${API_KEY}`);
        const apiFourthCall = await axios.get(`${API_URL}/games?page=${4}&key=${API_KEY}`);
        const apiFifthCall = await axios.get(`${API_URL}/games?page=${5}&key=${API_KEY}`);
        const allAPIVideoGames = [
            ...apiFirstCall.data.results,
            ...apiSecondCall.data.results,
            ...apiThirdCall.data.results,
            ...apiFourthCall.data.results,
            ...apiFifthCall.data.results,
        ];

        return [
            ...allDBVideoGames,
            ...allAPIVideoGames, 
        ]
    } catch (error) {
        return error
    }
};

// traemos por Id: en primer lugar, entra por parametro el id. este llega
// como string, por lo tanto se parsea. Se aplica el método findOne para que 
// retorne lo que coincida con el id en DB aegurandose que se trata de un Not a Number,
// de ser un numero se hace la busqueda en la Api.
// en el caso que no se encuentre el num de Id arroja un error.

const getGameById = async (id) => {
    try {
        if (isNaN(id)) {
            let gameId = await Videogame.findOne({
                where: {
                    id: id 
                },
                include: Genre,
            })
            return gameId
        }

        let gameId = await axios.get(`${API_URL}/games/${id}?key=${API_KEY}`)
        const gameDetail = {
            id: gameId.data.id,
            name: gameId.data.name,
            description: gameId.data.description_raw,
            platforms: gameId.data.platforms.map((platform) => platform.platform.name),
            image: gameId.data.background_image,
            year_start: gameId.data.released,
            rating: gameId.data.rating,
            genres: gameId.data.genres.map((genre) => genre.name),
        }
        return gameDetail
    }
        catch (error) {
            throw new Error(error)
        }
    }  
                
    const getGamesByName = async (name) => {
        try {
            const dbGamesByName = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
                include: Genre,
            });
            const apiGamesByName = await axios.get(`${API_URL}/games?search=${name}&key=${API_KEY}`);

            return [
                ...dbGamesByName,
                ...apiGamesByName.data.results,
            ].slice(0, 15);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    const createGame = async (name, description,platforms, image, year_start, rating, genres) => {
        try {
            const videogame = await Videogame.create({
                name: name,
                description: description,
                platforms:platforms,
                image: image,
                year_start: year_start,
                rating: rating,
            })

            await videogame.addGenre(genres)

            videogame.genres = genres
            return videogame
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

module.exports = {
    getVideoGames,
    getGameById,
    getGamesByName,
    createGame,
};
