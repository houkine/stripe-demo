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

// charge by token, need token
router.post('/checkout', async function(req, res, next) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [
      'card',
    ],
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'check out sample charge',
          },
          unit_amount: 50,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/result/success`,
    cancel_url: `http://localhost:3000/result/cancel`,
  });
  return res.status(200).json(session.url)

})

// charge by token, need token
router.post('/customerUI', async function(req, res, next) {
  let {card}=req.body
  //2 generate token
  const token = await stripe.tokens.create({
    card
  }).catch(e=>{
    return res.status(400).json(token)
  })
  console.log(token)

  //3 generate charge
  const charge = await stripe.charges.create({
    amount: 50,
    currency: 'aud',
    source: token.id,
  }).catch(e=>{
    return res.status(400).json(charge)
  })

  // Return and display the result of the charge.
  return res.status(200).json(charge)

})

module.exports = router;
