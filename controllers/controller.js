const mongoose = require('mongoose');
const jokes = require('../models/jokes');
const config = require('../config');

const fetch = require('node-fetch');
let registryUrl = 'https://krdo-joke-registry.herokuapp.com/api/services';

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
    try {
        const respons = await fetch(registryUrl);
        if (respons.status !== 200) // OK
            throw new Error(respons.status);
        return await respons.json();
    } catch (error) {
        console.log(error)
    }
}

exports.getSpecificSide = async function (url) {
    try {
        const respons = await fetch(url);
        if (respons.status !== 200) // OK
            throw new Error(respons.status);
        return await respons.json();
    } catch (error) {
        console.log(error);
    }
}
