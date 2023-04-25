const { Router } = require('express');
const { allTemperaments } = require('../controllers/temperament.controller')
const router = Router();

router.get('/', allTemperaments);

module.exports = router
