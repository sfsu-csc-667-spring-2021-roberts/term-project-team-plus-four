var express = require('express');
var router = express.Router();

/* GET lobby page. */
router.get('/', function(req, res, next) {
  res.render('lobbies', { title: 'Lobby' });
});

module.exports = router;