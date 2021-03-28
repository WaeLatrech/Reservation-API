const mongoose = require('mongoose');
const Joi = require('joi');
const Seance = require('./seance');
Joi.ObjectId = require('joi-objectid')(Joi)

/*
seance : {id : {type:mongoose.Schema.Types.ObjectId,ref:'Seance'},
                date : Date,
                temps : timestamp
            }
*/
/*const Seance = new mongoose.Schema({ 
    date: String
    });*/
const filmSchema = new mongoose.Schema({
    nom : {type : String, required : true},
    seances : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seance' }],
    acteurs : {type : [String] ,validate : { validator : function(v){
        return v.length > 0
    }
    , message : "Un film doit contenir au moin un acteurs"}},
});
    /*
    price : {type :Number, required : function(){
        return this.isPublished
    //=>Error in DB Strore : Course validation failed: 
    //price: Path `price` is required.
    },
    min : 10 , max : 300
    //=>Error in DB Strore : Course validation failed: price:
    // Path `price` (4) is less than minimum allowed value (10).
} */

const film_validation_schema = {
    nom : Joi.string().min(2).required(),
    seances : Joi.array().items({_id : Joi.ObjectId() , date: Joi.string() , temps : Joi.string() ,nombreDePlaceDisponible : Joi.number()}).required(),
    acteurs : Joi.array().items(Joi.string().min(4))
}
function validate_film(body){
    return Joi.validate(body, film_validation_schema);
}
const update_film_validation_schema = {
    name : Joi.string().min(5).max(50) ,  
    actors : Joi.array().min(3).items(Joi.string().min(5)),
    seance :Joi.array().items({_id : Joi.ObjectId() , date: Joi.date() , time : Joi.string() ,nbplaces : Joi.number()}), 
}

function validate_film_update (body) { 
    return Joi.validate(body , update_film_validation_schema) ; 
}
const Film = mongoose.model('Film',filmSchema);
module.exports.Film = Film;
module.exports.validate_film = validate_film;   
module.exports.validate_film_update = validate_film_update ; 

