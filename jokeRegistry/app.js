const mongoose = require('mongoose');

mongoose.connect('mongodb://registry:dip999@ds042459.mlab.com:42459/krdo_joke_registry',
    { useNewUrlParser: true, useUnifiedTopology: true });
