const router = require('express').Router();
const _ = require('lodash');
const Seance = require('../models/seance');

router.get('',async (req,res) => {
    res.send(await Seance.find());
});

router.post('',async (req,res) => {
    let seance = new Seance(_.pick(req.body,'date','temps','nombreDePlaceDisponible'));
    try {
        seance = await seance.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(seance);
});

module.exports = router;