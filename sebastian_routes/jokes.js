const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

//Sebastian og Jesper
router.get('/api/othersites', async (req, res) => {
        let sides = await controller.getSides();
        let specificSide = await controller.getSpecificSide(sides[1].address + '/api/jokes');
        console.log(specificSide);
        res.render('jokes', {sider: sides, enkelt: specificSide});
    })
    
router.get('/api/otherjokes/:site', async (req, res) => {

    })

//Dette er en test 


module.exports = router;