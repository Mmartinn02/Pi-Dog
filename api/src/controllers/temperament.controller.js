const { Temperament, Dog } = require('../db')

const allTemperaments = async (req,res) =>{
    try{
      const temperament = await Temperament.findAll({
        include: Dog
      })
      res.json(temperament);
    
    }catch (error){
      return res.status(500).json({message: error.message})
    }
  };

module.exports = {allTemperaments}