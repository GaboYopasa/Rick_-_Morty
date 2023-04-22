const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = (req, res) => {

    const { id } = req.params;

    axios(`${URL}${id}`)
        .then(response => response.data)
        .then(({ name, gender, species, origin, image, status }) => {

            const character = {
                id,
                name,
                gender,
                species,
                origin,
                image,
                status,
            }

            if(!response.data){
                return res.writeHead(404, { "Content-type": "text/plain" }).end("Not Fount")
            }
            else return res.writeHead(200, { "Content-type": "application/json" })
                .end(JSON.stringify(character))
        })
        .catch(error => res.writeHead(500, { "Content-type": "text/plain" }).end(error.message))

}

module.exports = {
    getCharById
}