const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 322,
    name: 'Gabo',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    origin: {
        name: 'Earth (C-137)'
    },
    image: 'image.jpg'
};

describe("Test de RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {

        it("Responde con estatus 200", async () => {
            await request.get("/rickandmorty/character/1").expect(200);
        });

        it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async() => {
            const response = await request.get("/rickandmorty/character/1");

            for(const prop in character){
                expect(response.body).toHaveProperty(prop);
            }
        });

        it("Si hay un error responde con un status: 500", async () => {
            const response = await request.get("/rickandmorty/character/3209j")
            expect(response.statusCode).toBe(500);
        });
    });

    
    describe("GET /rickandmorty/login", () => {

        const access = {access: true};

        it("Responde con las propiedad access en 'true' si la información del usuario es válida", async () => {
            const response = await request.get("/rickandmorty/login?email=gyopasaa@gmail.com&password=gabo1234");
            expect(response.body).toEqual(access);
        });

        it("Responde con las propiedad access en 'false' si la información del usuario es inválida", async () => {
            const response = await request.get("/rickandmorty/login?email=gyopasaaaaa@gmail.com&password=gabo123234");
            access.access = false;
            expect(response.body).toEqual(access);
        });
    });


    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el personaje en favoritos", async () => {

            const response = await request.post("/rickandmorty/fav").send(character);
            expect(response.body).toContainEqual(character);
        });

        it("Debe agregar personajes a favoritos sin eliminar los existentes", async () => {

            character.id = '912'
            character.name = 'Aaaaa'
            const response = await request.post("/rickandmorty/fav").send(character);
            expect(response.body.length).toBe(2);
        });
    });

    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si el Id solicitado no existe, debe retornar un arreglo con todos los favoritos", async () => {

            const response = await request.delete("/rickandmorty/fav/2asdas");
            expect(response.body.length).toBe(2);

        });

        it("Si el Id enviado existe, debe eliminarlo de favoritos", async () => {
            const response = await request.delete("/rickandmorty/fav/322");
            expect(response.body.length).toBe(1);
        });
    });
})