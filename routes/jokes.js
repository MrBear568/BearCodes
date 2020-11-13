const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

//Sebastian og Jesper
router.get('/api/othersites', async (req, res) => {
    let sides = await controller.getSides();
    let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
    // console.log(sides[3].address);
    res.render('jokes', { sider: sides, enkelt: specificSide });
})

router.get('/api/otherjokes/:site', async (req, res) => {
    let address = req.params.site;
    console.log(address);
    let site = await controller.getSpecificSide('https://' + address + '/api/jokes');
    res.send(site);
})


router.get('/', async (req, res) => {
    let sides = await controller.getSides();
    let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
    let jokes = await controller.getJokes();
    res.render('samlet', { sider: sides, enkelt: specificSide, jokes: jokes });
})

router.post('/', async (req, res) => {
    console.log('virker her')
    const setup = req.body.setup
    const punchline = req.body.punchline
    controller.createJoke(setup, punchline)

    // res.redirect('/api/jokes')
})

router.get('/api/jokes', async (req, res) => {
    const jokes = await controller.getJokes();
    res.render('opret', { title: 'Opret Joke', jokes: jokes });
})

router.post('/api/jokes', async (req, res) => {
    console.log("Okay guys denne post er aktiveret");
    const setup = req.body.setup
    const punchline = req.body.punchline
    if (setup.length < 0 || punchline.length < 0) {
        console.log('Joke kan ikke oprettes, et felt er ikke blevet udfyldt.')
    } else {
        await controller.createJoke(setup, punchline).then(() => {
            res.redirect('/');
        })
    }
})

module.exports = router;