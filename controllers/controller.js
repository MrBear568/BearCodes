const mongoose = require('mongoose');
const jokes = require('../models/jokes');
const config = require('../config');

mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

exports.createJoke = function (setup, punchline) {
    return jokes.create({
        setup,
        punchline
    });
};

exports.getJokes = function () {
    return jokes.find().exec();
};