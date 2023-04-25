const { Router } = require('express');
const { allDogs, dogById, addNewDog } = require('../controllers/dog.controller')
const router = Router();


router.get('/:dogId', dogById);

router.get('/', allDogs);

router.post('/', addNewDog);


module.exports = router