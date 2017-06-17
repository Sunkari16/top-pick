const mongoose = require('mongoose');

const PackageDetailsSchema = new mongoose.Schema({
    repo: {type: String, required: true, default: '', trim: true,},
    owner: {type: String, trim: true},
    data: {},
    dependencies: [{type: String, trim: true}],
    last_updated: {type: Date, default: Date.now()}
});

module.exports = PackageDetailsSchema;

