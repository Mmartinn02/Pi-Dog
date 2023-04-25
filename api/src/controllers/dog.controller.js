const { Dog, Temperament } = require('../db')
const { Sequelize, Op } = require('sequelize');

const allDogs = async (req,res) =>{
  try{
    if(req.query.name) {
      return dogByname(req, res)
    }

    const dogs = await Dog.findAll({
      include: Temperament
    })

    res.json(dogs);
  
  }catch (error){
    return res.status(500).json({message: error.message})
  }
};

async function dogByname(req, res) {

  const {name} = req.query;
  const search = '%' + name.toLowerCase() + '%'

  Dog.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: search
      }
    },
    include: Temperament
  })
  .then( result => {

    if (result !== null) {
        res.json(result)
    } else {
        res.status(404).json({success: false, msg: "Dog by Name not found"});
    }
  })
  .catch( err => {
      console.log(err);
      res.status(500).json({success: false, msg: 'Server internal error'})
  });
  

}


const dogById = async (req, res) => {

  const {dogId} = req.params;

  Dog.findOne({where: {id: dogId},
    include: Temperament})
  .then( result => {
    if (result !== null) {
        res.json(result)
    } else {
        res.status(404).json({success: false, msg: "Id not found"});
    }
  })
  .catch( err => {
      console.log(err);
      res.status(500).json({success: false, msg: 'Server internal error'})
  });

}

const addNewDog = async (req, res) => {
  const { name, image, height_min, weight_min, height_max, weight_max, life_span,temperament} = req.body;

  try{
      const arrOfTemperamentsNames = temperament.map(item => item.name)
      const newDog = await Dog.create({
        name, 
        image, 
        height_min, 
        weight_min, 
        height_max, 
        weight_max, 
        life_span,
      })
      const arrOfTemperamentsInDatabase = await Temperament.findAll({where: {name: {[Op.in]: arrOfTemperamentsNames}}})
      if(arrOfTemperamentsInDatabase !== null){
        arrOfTemperamentsInDatabase.map(item => newDog.addTemperament(item))
      }
      
      res.json({...newDog.dataValues, Temperaments: arrOfTemperamentsInDatabase})
  }catch(error){
      return res.status(500).json({message: error.message})
  }
}





module.exports = {allDogs, dogById, addNewDog}