const express = require('express');
const router = express.Router();

// const stripe = require('stripe')('sk_test_51JG00dE2Ts4LItHZw9xtXa0seCCWp3mxjvwHYVv3N3VRGrhSIqLfPoktprSLRlgu39XjiTd3MXR0EOFRrLachEvF00pUF7Q6Zq');
const stripe = require('../utils/stripe');

// charge by token, need token
router.post('/token', async function(req, res, next) {
  let {stripeToken}=req.body

  const charge = await stripe.charges.create({
    amount: 50,
    currency: 'aud',
    source: stripeToken.token.id,
  }).catch(e=>{
    return res.status(400).json(charge)
  })

  // Return and display the result of the charge.
  return res.status(200).json(charge)
})

module.exports = router;
