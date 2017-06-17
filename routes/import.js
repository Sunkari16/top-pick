const ImportController = require('../controllers/import');
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    ImportController.import(req, res, next);
});

module.exports = router;
