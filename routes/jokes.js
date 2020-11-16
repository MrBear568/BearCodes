const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch")

router.get('/api/othersites', async (req, res) => {
    try {
        let sides = await controller.getSides();
        //let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
        // console.log(sides[3].address);
        res.render('jokes', { sider: sides });
    } catch (error) {
        console.log(error);
    }
})

router.get('/api/otherjokes/:site', async (req, res) => {
    let data = []
    try {
        let otherSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        data = await otherSites.json()
        let sitename = req.params.site
        let url
        let element
        for (let i = 0; i < data.length; i++) {
            element = data[i];
            if (element.name && element.name.toLowerCase() === sitename.toLowerCase()) {
                url = element.address
                break
            }
        }

        //if (url.substr(-1) !== '/') {
        //  url = url + '/';
        // }
        let chosenSite = await fetch(url + 'api/jokes')
        let chosenData = await chosenSite.json()
        res.render('andreJokes', { title: 'Andre folks jokes', jokes: chosenData });
    } catch (error) {
        console.log(error)
    }
})


router.get('/', async (req, res) => {
    try {
        // let sides = await controller.getSides();
        // let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
        // let jokes = await controller.getJokes();
        // res.render('opret', {jokes: jokes });
        res.redirect('/api/jokes')
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