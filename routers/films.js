const router = require('express').Router();
//const Film = require('../models/film');
const {Film, validate_film /*,validate_film_update*/} = require('../models/film');
const _ = require('lodash');
const Seance = require('../models/seance');


router.get('', async (req,res)=>{
    res.send(await Film.find().populate('seance'));
})
router.get('/:id', async (req,res)=>{
    let film = await Film.findById(req.params.id)
                            .populate('seance.date')
    
    if(!film)
        return res.status(404).send("Id n'est past trouvable");
    res.send(film);

});

router.post('' ,async  (req ,res)=> { 
    let validation = validate_film(req.body) ; 
    if(validation.error )
            return res.status(400).send(validation.error.details[0].message ) ; 
   // let seance = await Seance.findById(req.body.seance.id);
   // if (!seance)
   // return res.status(400).send("L Id de la seance n'est pas trouvable dans la BD")
   // req.body.seance.date = seance.date;
    let film = new Film ({ 
         ...req.body
     }) ; 
     film = film.save()  
     .then(film => res.status(201).send(film) )  
     .catch(error => res.status(400).json({error}))  ; 
    }) ; 



module.exports = router;