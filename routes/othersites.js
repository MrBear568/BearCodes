const express  = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
    try {
        let allSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        let data = await allSites.json()
        res.render('othersites', {allSites: data})
    } catch (error) {
        console.log(error)
    }
})

router.get('/:site', async (req, res) => {
    let data = []
    try {
        let allSites = await fetch('https://krdo-joke-registry.herokuapp.com/api/services')
        data = await allSites.json()
        let addressName = req.params.site
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

module.exports = router;

