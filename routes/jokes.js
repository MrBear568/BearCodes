const controller = require("../controllers/controller");
const express = require('express');
const jokes = require("../models/jokes");
const router = express.Router();

router
    .get('/api/jokes', async (req, res) => {
        const jokes = await controller.getJokes()

        res.render('jokes', {jokes: jokes})
    })
    .post('/api/jokes', async (req, res) => {
        const setup = req.body.setup
        const punchline = req.body.punchline
        controller.createJoke(setup, punchline)

        res.redirect('/api/jokes')
    })

//Dette er en test 


module.exports = router;