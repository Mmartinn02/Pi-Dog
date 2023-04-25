const { Dog, Temperament } = require('../db')
const DogAPIService = require('./dog.service')
const dogService = new DogAPIService()

async function seedDb() {
    try {
        const dogsNotExists = (await Dog.count()) === 0
        const temperamentNotExists = (await Temperament.count()) === 0
        
        if(dogsNotExists || temperamentNotExists) {
            const dogs = await dogService.getAllDog();
            const temperamentsSavedInDB = await Temperament.bulkCreate(Object.values(dogService.getDictionary()), {updateOnDuplicate: ['name']} )
            dogService.setTemperamentDBDictionaryByName(temperamentsSavedInDB)
            dogs.forEach(async dog => {
                const [ dogInDB ] = await Dog.upsert(dog)
                if(dog.temperaments) {
                    dog.temperaments.forEach(temperament => {
                        dogInDB.addTemperament(dogService.getTemperamentDBItemInDictionaryByName(temperament.name))
                    })
                }
            })
            console.log('Seeding completed')
            return
        }
        console.log('Database already seeded. Ready for work!!')

    } catch (e) {
        console.log('Error in seed of DB:', e)
    }
}

setTimeout(() => { seedDb()}, 6000)

module.exports = seedDb