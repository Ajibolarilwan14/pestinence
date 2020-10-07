const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

// connection to mongodb
mongoose.connect(keys.mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// log success message on connection to the database
mongoose.connection.on('connected', () => {
    console.log("yeah, connected to mongodb");
});

// log error message failure to connect to the database
mongoose.connection.on('error', () => {
    console.log("error connecting to mongodb", err);
});

// exporting the model
require('./models/user');
require('./models/book');

// registering the routes
app.use(require('./routes/auth'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`server currently running on port ${PORT}`);
})