const mongoose = require('mongoose');

const SearchResultsSchema = new mongoose.Schema({
    key:  { type: String, required: true, default: '', trim: true,},
    sort : {type: String, trim: true},
    order : {type: String, trim: true},
    results: {}
});

module.exports =  SearchResultsSchema;

