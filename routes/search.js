const SearchController = require('../controllers/search');
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    SearchController.search(req, res, next);
});

module.exports = router;
