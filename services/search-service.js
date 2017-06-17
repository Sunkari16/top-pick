/**
 * Created by hari on 17/06/17.
 */
const GithubSearchService = require('./github/search');
const Models = require('../models/models');
const  _ = require('lodash');
class SearchService {
    static _saveResults(key, sort, order, result) {
        const SearchResultsModel = Models.SearchResults;
        const searchResults = new SearchResultsModel({});
        console.log(searchResults);

       _.extend(searchResults,  {
            key: key,
            sort: sort,
            order: order,
            results: result
        });
        searchResults.save().then(data => {
            console.log(" Results saved for key " + key)
        });
    }

    static search(q, sort, order) {
        const SearchResultsModel = Models.SearchResults;
        return SearchResultsModel.findOne({key: q})
            .then(result => {

                if (result) {
                    return result.results;
                }
                return GithubSearchService.search(q, sort, order)
                    .then(result => {
                        // console.log(result);
                        this._saveResults(q, sort, order, result);
                        return result;
                    });
            })

    }
}
;
module.exports = SearchService;