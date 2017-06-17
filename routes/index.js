var express = require('express');
var router = express.Router();
var TopPackController = require('../controllers/top-pack');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});
router.get('/top-packs', function(req, res, next) {
    TopPackController.topPacks(req,res, next);
});
module.exports = router;
