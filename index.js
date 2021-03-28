require('./db')

const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

const seance_router = require('./routers/seances');
const film_router = require('./routers/films');

app.use(express.json())
app.use('/api/seances',seance_router);
app.use('/api/films',film_router);


app.listen(port,() => console.log('Server On ',port))