/**
 * Created by hari on 17/06/17.
 */
const SearchService = require('../services/search-service');
const _ = require('lodash');
class SearchController {
    static search(req, res, next) {
        const key = req.query.q;
        if (_.isEmpty(key)) {
            const error = new Error("Please provide a valid key");
            error.status = 400;
            return next(error);
        }
        SearchService.search(key)
            .then(results => {
                res.json(results)
            })
            .catch(next);
    }
}
module.exports =SearchController;