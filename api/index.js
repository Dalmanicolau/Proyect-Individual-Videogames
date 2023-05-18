//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const axios = require('axios')
const { API_KEY, API_URL } = process.env


// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const apiVideogames = await axios.get(`${API_URL}/genres?key=${API_KEY}`)
  
  //me traifo todos los generos de la api, la propiedad name y creo un array de 
  //obj que contienen name y su valor.
  genreName = apiVideogames.data.results.map((videogame) => ({ name: videogame.name }))
  
  //crea una cantidad x de generos
  Genre.bulkCreate(genreName)

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
