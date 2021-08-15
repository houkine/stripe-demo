const express = require('express');
const router = express.Router();

// const stripe = require('stripe')('sk_test_51JG00dE2Ts4LItHZw9xtXa0seCCWp3mxjvwHYVv3N3VRGrhSIqLfPoktprSLRlgu39XjiTd3MXR0EOFRrLachEvF00pUF7Q6Zq');
const stripe = require('../utils/stripe');
const clientID = 'ca_JwdlRdCgDFfzaSbOZSnVd2FOCRWA5Vp8'

/**
 * a success multi-party payment needs the following steps:
 * 1. create express accounts for users
 * 2. charge for the first user
 * 3. send money to secound user
 */


// create a account
router.post('/createCustomerAccount', async function(req, res, next) {
  let {email,BSB,account_number} = req.body
  console.log(BSB)
  // create a customer account
  const account = await stripe.accounts.create({
    type: 'custom',
    country: 'AU',
    email,
    business_type: "individual",
    // this is necessary for connect account, cause you will need to transfer money
    external_account: {
      object: "bank_account",
      country: "AU",
      currency: "AUD",
      routing_number: BSB,
      account_number,
    },
    // pre filled fields
    individual: {
      first_name: 'tester_f',
      last_name: 'tester_l',
      dob: {
        day: 01,
        month: 01,
        year: 2000,
      },
      email: 'test@email.com',
      phone: '+611800529728',
      address: {
        city: 'Brisbane',
        country: 'AU',
        line1: 'Queen St',
        postal_code: '4000',
        state: 'QLD'
      },
    },
    business_profile: {
      url: 'https://houkine.com'
    },
    capabilities: {
      card_payments: {requested: true},
      transfers: {requested: true},
    },
    tos_acceptance: {
      date: Math.floor(Date.now() / 1000),
      ip: req.connection.remoteAddress // Assumes you're not using a proxy
    }
  });
  // ready to link
  const AccountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/result/success',
      return_url: 'http://localhost:3000/result/cancel',
      type: 'account_onboarding',
    }).catch(e=>{
      return res.status(400).json(AccountLink)
    });

  // Return and display the result of the charge.
  console.log(AccountLink)
  return res.status(200).json(AccountLink.url)
})
router.post('/createExpressAccount', async function(req, res, next) {
  const account = await stripe.accounts.create({
    type: 'express',
  });

  // Return and display the result of the charge.
  return res.status(200).json(account)
})

router.get('/', async function(req, res, next) {
  let {id} = req.body
  const account = await stripe.accounts.retrieve(id);
  // console.log(accounts.data)
  return res.status(200).json(account)
})
router.get('/getAll', async function(req, res, next) {
  const accounts = await stripe.accounts.list({limit:100,});
  return res.status(200).json(accounts.data)
})

// get the balance of a user, returns the available money + pending money
router.get('/balance', async function(req, res, next) {
  let {stripeAccount}=req.query
  const balance = await stripe.balance.retrieve({stripeAccount});
  console.log(stripeAccount,balance.available[0].amount+balance.pending[0].amount)
  return res.status(200).json(balance.available[0].amount+balance.pending[0].amount)
})

// get account activate link, used to verify user
router.get('/createAccountLinks', async function(req, res, next) {
  let {id}=req.query
  const AccountLink = await stripe.accountLinks.create({
    account: id,
    refresh_url: 'https://www.google.com/',
    return_url: 'https://www.google.com/',
    type: 'account_onboarding',
  }).catch(e=>{
    return res.status(400).json(AccountLink)
  });
  return res.status(200).json(AccountLink)
})
// delete a account
router.delete('/deleteAccount', async function(req, res, next) {
  let {id} = req.body

  const deleted = await stripe.accounts.del(id)

  // Return and display the result of the charge.
  return res.status(200).json(deleted)
})


router.post('/payToAccountNoDelay', async function(req, res, next) {

  let {PayToAccountNow_money,paymentMethod,id}=req.body
  console.log(PayToAccountNow_money,paymentMethod.id,id)
  //1 create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: PayToAccountNow_money,
    currency: 'aud',
    payment_method_types: ['card'],
    application_fee_amount: 5,
    transfer_data: {
      destination: id,
    },
  });
  //2 confirm payment
  const paymentResult = await stripe.paymentIntents.confirm(
    paymentIntent.id,
    {payment_method:paymentMethod.id},
  ).catch(e=>{
    console.log(e)
    return res.status(400)
  })
  // console.log('\paymentResult id:',paymentResult.id)
  // Return and display the result of the charge.
  return res.status(200).json('success')
})
router.post('/payout', async function(req, res, next) {
  let {id}=req.body

  const paymentIntent = await stripe.transfers.create({
    amount: 50,
    currency: 'aud',
    // application_fee_amount: 5,
    transfer_group: "test_group",
    destination: id,
  });

  // Return and display the result of the charge.
  return res.status(200).json(paymentIntent)
})
module.exports = router;
