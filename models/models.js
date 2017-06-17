/**
 * Created by hari on 17/06/17.
 */
const mongoose = require('mongoose');
const SearchResultsSchema = require('./github-search-results');

const models = {
    SearchResults: mongoose.model("SearchResults", SearchResultsSchema)
}


module.exports = models;