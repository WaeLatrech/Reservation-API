const number = require('joi/lib/types/number');
const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema({
    date : {type : String, required : true},
    temps : {type : String, required : true},
    nombreDePlaceDisponible : {type : Number, required : true}

});

const Seance = mongoose.model('Seance',seanceSchema);
module.exports = Seance;