var express = require('express');
var router = express.Router();
// require('../service/init')


// const userRouter = require('./user')
const directChargeRouter = require('./directCharge')

// router.use('/user', userRouter)
router.use('/directCharge', directChargeRouter)


module.exports = router;