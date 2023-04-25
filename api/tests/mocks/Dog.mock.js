const { Dog, Temperament } = require('../../src/db.js');

const createDogMock = async () => {
    const dog = await Dog.create({
        id: '859f7320-89ec-11ed-b4e3-df6017c30dba',
        externalId: null,
        name: 'Pug',
        height_max: null,
        weight_max: null,
        height_min: null,
        weight_min: null,
        life_span: null,
        image: null,
        createdAt: '2023-01-01T15:54:06.546Z',
        updatedAt: '2023-01-01T15:54:06.546Z',
    })
    dog.addTemperament(await Temperament.create({name: 'Calm'}))
    return dog
}

module.exports = {createDogMock}