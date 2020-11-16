const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

//Sebastian og Jesper
router.get('/api/othersites', async (req, res) => {
    try {
        let sides = await controller.getSides();
        let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
        // console.log(sides[3].address);
        res.render('jokes', { sider: sides, enkelt: specificSide });
    } catch (error) {
        console.log(error);
    }
})

router.get('/api/otherjokes/:site', async (req, res) => {
    try {
        let address = req.params.site;
        console.log(address);
        let site = await controller.getSpecificSide('https://' + address + '/api/jokes');
        res.send(site);
    } catch (error) {
        console.log(error);
    }
})


router.get('/', async (req, res) => {
    try {
        let sides = await controller.getSides();
        let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
        let jokes = await controller.getJokes();
        res.render('samlet', { sider: sides, enkelt: specificSide, jokes: jokes });
    } catch (error) {
        console.log(error);
    }

})

router.post('/', async (req, res) => {
    console.log('virker her')
    const setup = req.body.setup
    const punchline = req.body.punchline
    try {
        controller.createJoke(setup, punchline)
    } catch (error) {
        console.log(error);
    }


    // res.redirect('/api/jokes')
})

router.get('/api/jokes', async (req, res) => {
    try {
        const jokes = await controller.getJokes();
        res.render('opret', { title: 'Opret Joke', jokes: jokes });
    } catch (error) {
        console.log(error);
    }

})

router.post('/api/jokes', async (req, res) => {
    console.log("Okay guys denne post er aktiveret");
    const setup = req.body.setup
    const punchline = req.body.punchline
    try {
        await controller.createJoke(setup, punchline).then(() => {
            res.redirect('/');
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;