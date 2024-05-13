// routes/index.js
const express = require('express');
const productroutes = require('./api/productroutes');


const router = express.Router();

router.use('/api', productroutes);

module.exports = router;
