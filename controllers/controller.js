const mongoose = require('mongoose');
const jokes = require('../models/jokes');
const config = require('../config');

const fetch = require('node-fetch');
let registryUrl = 'https://krdo-joke-registry.herokuapp.com/api/services';

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

exports.getSides = async function get() {
    const respons = await fetch(registryUrl);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

exports.getSpecificSide = async function (url) {
        const respons = await fetch(url);
        if (respons.status !== 200) // OK
            throw new Error(respons.status);
        return await respons.json();
    }
