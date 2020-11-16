const express = require('express');
const app = express();
app.set('view engine', 'pug');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'))

//Routes 
const bearJokes = require('./routes/bearJokes');
app.use('/', bearJokes);
const jokesRoute = require('./routes/jokes');
app.use('/jokes', jokesRoute);
const otherSiteRoute = require('./routes/othersites');
app.use('/othersites', otherSiteRoute);
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

app.listen(process.env.PORT, () => {
    console.log(`server kører på port ${process.env.PORT}`);
})


// mika test