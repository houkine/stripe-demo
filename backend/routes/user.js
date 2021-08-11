const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripe');
const db = require('../utils/db');


// get all users
router.get('/users', async function(req, res, next) {
    let users = db.getUsers()
    return res.status(200).json(users)
})

// add a user
router.post('/', async function(req, res, next) {
    let {name,token} = req.body

    console.log(name,token)
    //1 create stripe customer for this user
    const customer = await stripe.customers.create({
        name,
        source: token,
    });
    console.log(customer)
    // 2 make user object
    let user = {
        name,
        cus_id:customer.id,
    }

    // 3 add to database
    let result = db.addUser(user)

    //4 return
    return res.status(200).json(user)
})


module.exports = router;