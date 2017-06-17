/**
 * Created by hari on 17/06/17.
 */
const mongoose = require('mongoose');
const SearchResultsSchema = require('./github-search-results');
const PackageDetailsSchema = require('./github-package-json');
const GitHubRepoSchema = require('./github-repos');

const models = {
    SearchResults: mongoose.model("SearchResults", SearchResultsSchema),
    PackageDetailsSchema: mongoose.model("PackageDetailsSchema", PackageDetailsSchema),
    GitHubRepos: mongoose.model("GitHubReposSchema", GitHubRepoSchema),
}


module.exports = models;