const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const Joke = require("../models/jokes")
const controller = require("../controllers/controller");

// Henter vores jokes som JSON
router.get('/jokes', async (request, response) => {
    try {
        const jokes = await Joke.find({})
        const jokesJSON = JSON.stringify(jokes)
        response.send(jokesJSON)
    } catch (error) {
        console.log(error)
    }
})

// Henter alle andre sites som JSON
router.get('/othersites', async (request, response) => {
    try {
        let allSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await allSites.json()
        let allSitesJSON = JSON.stringify(data)
        response.send(allSitesJSON)
    } catch (error) {
        console.log(error)
    }
})

// Henter et andet sites jokes som JSON
router.get('/otherjokes/:site', async (request, response) => {
    try {
        let allSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await allSites.json()
        let addressName = request.params.site
        let url
        let element
        for (let i = 0; i < data.length; i++) {
            element = data[i];
            if (element.name && element.name.toLowerCase() === addressName.toLowerCase()) {
                url = element.address
                break
            }
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/jokes', async (request, response) => {
    console.log("Okay guys denne post er aktiveret");
    const setup = req.body.setup
    const punchline = req.body.punchline
    try{
        if (setup.length <= 0 || punchline.length <= 0) {
            console.log('Joke kan ikke oprettes, et felt er ikke blevet udfyldt.')
            res.redirect('/');
        } else {
            await controller.createJoke(setup, punchline).then(() => {
                res.redirect('/');
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router