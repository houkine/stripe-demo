var express = require('express');
var router = express.Router();
// require('../service/init')


// const userRouter = require('./user')
const directChargeRouter = require('./directCharge')
const multipartyPaymentRouter = require('./multipartyPayment')
const resultRouter = require('./result')
const userRouter = require('./user')

// router.use('/user', userRouter)
router.use('/directCharge', directChargeRouter)
router.use('/multipartyPayment', multipartyPaymentRouter)
router.use('/result', resultRouter)
router.use('/user', userRouter)


module.exports = router;