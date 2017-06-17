const mongoose = require('mongoose');

const PackageDetailsSchema = new mongoose.Schema({
    repo:  { type: String, required: true, default: '', trim: true,},
    owner : {type: String, trim: true},
    data : {},
    dependencies : [{type: String, trim: true}]
});

module.exports =  PackageDetailsSchema;
