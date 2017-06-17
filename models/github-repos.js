const mongoose = require('mongoose');

const GitHubRepoSchema = new mongoose.Schema({
    id: {type: Number, default: 0},
    name: {type: String, required: true, default: '', trim: true,},
    full_name : {type: String, required: true, default: '', trim: true,},
    owner: { },
    last_updated: {type: Date, default: Date.now()},
    stargazers_count:  {type: Number, default: 0},
    forks_count:  {type: Number, default: 0},
});

module.exports = GitHubRepoSchema;

