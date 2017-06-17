/**
 * Created by hari on 17/06/17.
 */
const mongoose = require('mongoose');
const SearchResultsSchema = require('./github-search-results');
const PackageDetailsSchema = require('./github-package-json');

const models = {
    SearchResults: mongoose.model("SearchResults", SearchResultsSchema),
    PackageDetailsSchema: mongoose.model("PackageDetailsSchema", PackageDetailsSchema)
}


module.exports = models;