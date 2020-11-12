const express = require('express');
const app = express();
app.set('view engine', 'pug');
const config = require('./config');

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise
console.log(config.mongoDBHost);
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
//app.use('/api/jokes', jokesRoute);

app.listen(config.localPort, () =>{
    console.log(`server kører på port ${config.localPort}`);
})


// mika test