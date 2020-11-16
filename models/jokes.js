const mongoose = require('mongoose');

const jokes = new mongoose.Schema({
    setup: String,
    punchline: String,
});

module.exports = mongoose.model('Jokes', jokes);