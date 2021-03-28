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

router.get('/:id', async (req,res)=>{
    Seance.findOne({_id: req.params.id})
    .then(seance=> res.status(200).json(seance))
    .catch(error=> res.status(400).json({error})) ;  
    

});

router.put('/:id', async (req,res)=>{
 
    let seance =await Seance.updateOne({_id:req.params.id} , { ...req.body})
    if(!seance)
        return res.status(404).send('Id is not found')
    seance = await Seance.findById(req.params.id);
    res.send(film) ; 
}) ;

router.delete('/:id', async (req,res)=>{
    let seance =await Seance.findById(req.params.id);
    if(!seance)
        return res.status(404).send('Id is not found')
    await Seance.deleteOne({_id:req.params.id})
    res.send(seance);
});


router.post('/:id/reservation/:nombreDePlaceDisponible',async (req,res)=>{
    
    let seance = await Seance.findById(req.params.id);
   if(!seance)
       return res.status(400).send("Id n'est past trouvable");
    let updated_seance=seance ;
   if(req.params.nombreDePlaceDisponible <= seance.nombreDePlaceDisponible)
   {
    updated_seance.nombreDePlaceDisponible=seance.nombreDePlaceDisponible-req.params.nombreDePlaceDisponible
   } else { 
       res.status(404).json({ message : "Il ne reste plus de place pour cette seance"})
   }
   
   seance = _.merge(seance,updated_seance);
   seance = await seance.save();
   res.send(seance);
}) ; 

module.exports = router;