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
  let {email} = req.body
  const account = await stripe.accounts.create({
    type: 'custom',
    country: 'AU',
    email,
    capabilities: {
      card_payments: {requested: true},
      transfers: {requested: true},
    },
    tos_acceptance: {
      date: Math.floor(Date.now() / 1000),
      ip: req.connection.remoteAddress // Assumes you're not using a proxy
    }
  });

  const AccountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://www.google.com/',
      return_url: 'https://www.google.com/',
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

router.get('/getAll', async function(req, res, next) {
  const accounts = await stripe.accounts.list({limit:100,});
  return res.status(200).json(accounts.data)
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


router.post('/collectPayment', async function(req, res, next) {

  let {Anumber, Aexp_month, Aexp_year, Acvc,}=req.body
  //1 create account 
  const account = await stripe.accounts.create({
    type: 'custom',
    country: 'AU',
    email:'test@gmail.com',
    business_type: "individual",
    individual: {
      first_name: 'first',
      last_name: 'last',
      dob: {
        day: 1,
        month: 1,
        year: 2000,
      },
      email: 'test@gmail.com',
      phone: '1234123123',
      address: {
        city: 'Brisbane',
        country: 'Australia',
        line1: '1024 Ann',
        postal_code: '4000',
        state: 'QLD'
      },
    },
    business_profile: {
      url: 'http://24hour.konnectapplications.xyz'
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
  //2 generate token
  const token = await stripe.tokens.create({
    card: {
      number: Anumber,
      exp_month: Aexp_month,
      exp_year: Aexp_year,
      cvc: Acvc,
    },
  }).catch(e=>{
    return res.status(400)
  })
  console.log('\ntoken id:',token.id)

  //3 charge person, send money to stripe token
  const charge = await stripe.charges.create({
    amount: 50,
    currency: 'aud',
    // application_fee_amount: 5,
    source: token.id,
    transfer_group: "test_group"
  });

  // Return and display the result of the charge.
  return res.status(200).json(charge)
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
