const express = require('express');
const router = express.Router();

// two status for check out
router.get('/success', async function(req, res, next) {
  return res.status(200).json('check out success')
})
router.get('/cancel', async function(req, res, next) {
    return res.status(200).json('check out cancelled')
})


module.exports = router;
