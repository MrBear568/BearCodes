const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

//Sebastian og Jesper
router.get('/api/othersites', async (req, res) => {
    let sides = await controller.getSides();
    let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
    console.log(specificSide);
    res.render('jokes', { sider: sides, enkelt: specificSide });
})

router.get('/api/otherjokes/:site', async (req, res) => {

})

router.get('/', async (req, res) => {
    let sides = await controller.getSides();
    let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
    console.log(specificSide);
    res.render('samlet', { sider: sides, enkelt: specificSide });
})

router.get('/api/jokes', async (req, res) => {
    const jokes = await controller.getJokes()

    res.render('opret')
})

router.post('/api/jokes', async (req, res) => {
    const setup = req.body.setup
    const punchline = req.body.punchline
    controller.createJoke(setup, punchline)

    // res.redirect('/api/jokes')
})

router.get('/', async (req, res) => {
    const jokes = await controller.getJokes()

    res.render('samlet', { joke: jokes })
})

router.post('/', async (req, res) => {
    const setup = req.body.setup
    const punchline = req.body.punchline
    controller.createJoke(setup, punchline)

    // res.redirect('/api/jokes')
})

module.exports = router;