const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const jokes = await controller.getJokes()
        res.render('jokes', {jokes: jokes})
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const setup = req.body.setup
    const punchline = req.body.punchline

    try {
        await controller.createJoke(setup, punchline)
        const gags = await controller.getJokes()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

router.get('/api/jokes', async (req, res) => {
    const jokes = await controller.getJokes();
    res.render('opret', { title: 'Opret Joke', jokes: jokes });
})

router.post('/api/jokes', async (req, res) => {
    console.log("Okay guys denne post er aktiveret");
    const setup = req.body.setup
    const punchline = req.body.punchline
    if (setup.length <= 0 || punchline.length <= 0) {
        console.log('Joke kan ikke oprettes, et felt er ikke blevet udfyldt.')
        res.redirect('/');
    } else {
        await controller.createJoke(setup, punchline).then(() => {
            res.redirect('/');
        })
    }
})

module.exports = router;