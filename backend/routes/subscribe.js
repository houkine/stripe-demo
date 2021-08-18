const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripe');
const db = require('../utils/db');

const price = 'price_1JPmGlE2Ts4LItHZOef9eBsy'


/**
 * get subscription status
 * this function is used for et the status of one customer's subscription
 * need cus_id, return subscription.status (enum)
 */
router.get('/', async function(req, res, next) {
    let {customerId} = req.query
    console.log('customerId:'+customerId)

    // 1 find sub id by cus id in user table
    let user = db.findUser(customerId)

    // 2 get subscription obj
    const subscription = await stripe.subscriptions.retrieve(user.sub_id);

    // 3 return 
    return res.status(200).json(subscription.status)
})

/**
 * create a subscription
 * need cus_id
 */
router.post('/', async function(req, res, next) {
    // 1 find the customer id by user id
    let {customerId} = req.body

    // 2 subscription , get subscription
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{price},],
    });

    // 3 save to database
    let user = db.findUser(customerId)
    user={...user,
        sub_id:subscription.id,
    }
    db.updateUser(user)
    // 4 return
    return res.status(200).json(subscription.id)
})

/**
 * cancel a subscription
 * need cus_id
 */
router.delete('/', async function(req, res, next) {
    // 1 find the customer id by user id
    let {customerId} = req.body

    // 2 find sub id by cus id in user table
    let user = db.findUser(customerId)

    // 3 cancel subscription 
    const deleted  = await stripe.subscriptions.del(user.sub_id);

    // 4 return
    return res.status(200).json(deleted)
})

module.exports = router;