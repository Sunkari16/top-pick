const mongoose = require('mongoose');

const PackageDetailsSchema = new mongoose.Schema({
    repo: {type: String, required: true, default: '', trim: true,},
    owner: {type: String, trim: true},
    data: {},
    dependencies: [{type: String, trim: true}],
    last_updated: {type: Date, default: Date.now()},
    no_of_stars:  {type: Number, default: 0},
    forks:  {type: Number, default: 0},
});

module.exports = PackageDetailsSchema;

