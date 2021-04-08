var express = require('express');
const app = require('../app');
const { $pool } = require('../db');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Singup' });
});

module.exports = router;