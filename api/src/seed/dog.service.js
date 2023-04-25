// Aca extraemos la data de la API y en base a eso construimos la base de datos
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');

class DogAPIService {
    constructor() {
        this.url = "https://api.thedogapi.com/v1/breeds"
        this.temperamentDictionary = {}
        this.temperamentDBDictionary = {}
    }

    async getAllDog() {
        // a esto se le podria agregar un try catch para manejar el error en el caso que la api no ande
        const allDogFromAPI = await axios.get(this.url);

        const dogs = allDogFromAPI.data?.map(dog => {
            const temperaments = this.addValuesToDictionary((dog.temperament||'').split(', '))
            return {
                id: uuidv4(),
                externalId: dog.id,
                name: dog.name,
                image: dog.image.url,
                height_min: this.getMinAndMaxValue(dog.height)[0],
                weight_min: this.getMinAndMaxValue(dog.weight)[0],
                height_max: this.getMinAndMaxValue(dog.height)[1],
                weight_max: this.getMinAndMaxValue(dog.weight)[1],
                life_span: dog.life_span,
                temperaments,
            }
        })

        return dogs
    }

    setTemperamentDBDictionaryByName(arrOfItems) {
        arrOfItems.forEach(item => {this.temperamentDBDictionary[item.name] = item})
        return this.temperamentDBDictionary
    }

    getDictionary() {
        return this.temperamentDictionary
    }

    getTemperamentDBItemInDictionaryByName(name) {
        return this.temperamentDBDictionary[name.toLowerCase()]
    }

    getMinAndMaxValue(objValue, metricSystem = 'metric') {
        const nullResult = [null, null]
        if(!objValue) {
            return nullResult
        }
        const value = objValue[metricSystem]
        if(!value) return nullResult
        return value.split(" - ").map(stringValue => +(Number(stringValue).toFixed(0)) || null)
    }

    addValuesToDictionary(arrOfDogTemperaments) {
        // esto deberia agregar los valores al dictionary y retornar los ids asociados ya sea que esten duplicados o no
        const arrOfTemperamentsWithId = []
        arrOfDogTemperaments.forEach(temperament => {
            const temperamentValue = temperament.toLowerCase()
            if(temperamentValue === '') return
            // ver si existe para extraer el id
            const existingValue = this.temperamentDictionary[temperament]
            if(!existingValue) {
            this.temperamentDictionary[temperamentValue] = {
                id: uuidv4(),
                name: temperamentValue
            }
            }
            arrOfTemperamentsWithId.push(this.temperamentDictionary[temperamentValue])
        })
        return arrOfTemperamentsWithId
    }

    getTemperamentsByStringList(stringList) {
        // Example of stringList param:"Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous", 
        return stringList.split(', ')
    }

}

module.exports = DogAPIService




