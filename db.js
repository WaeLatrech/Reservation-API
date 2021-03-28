const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Wael:07487009Hello@firstcluster.e41q1.mongodb.net/Reservations?retryWrites=true&w=majority',
{ useNewUrlParser : true, useUnifiedTopology : true})
.then(() => console.log("Mongo is UP..."))
.catch((err) => console.log('Mongo Is Down : ' ,err));