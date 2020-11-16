const express = require('express');
const app = express();
app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise
console.log(process.env.DATABASE_URL);
mongoose.connect('mongodb://localhost/jokes', {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'))

//Routes 
const jokesRoute = require('./routes/jokes');
app.use('/', jokesRoute);
app.use('/api/othersites', jokesRoute);
app.use('/api/jokes', jokesRoute);

app.listen(process.env.PORT, () => {
    console.log(`server kører på port ${process.env.PORT}`);
})


// mika test