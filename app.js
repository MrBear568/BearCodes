const express = require('express');
const app = express();
app.set('view engine', 'pug');
config = require('./config');

const bodyparser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

//mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/jokes', {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, 
    useUnifiedTopology: true
});


//Routes 
const jokesRoute = require('./routes/jokes');
app.use('/', jokesRoute);
app.use('/api/othersites', jokesRoute);
app.use('/api/jokes', jokesRoute);

app.listen(config.localPort, () =>{
    console.log(`server kører på port ${config.localPort}`);
})


// mika test