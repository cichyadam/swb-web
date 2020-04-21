const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./database/connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config/config');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
    type: 'application/json',
}));
app.use(cors());
app.use(helmet());

// mongoose
//   .connect(
//     'mongodb://mongo:27017/docker-node-mongo',
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));


require('./routes')(app);

app.listen(config.port, (error) => {
    if (error) {
        console.log('\x1b[31m', error, '\x1b[0m');
    }
    console.log('\x1b[32m', `Running on http://${config.host}:${config.port}` , '\x1b[0m');

    connectDb().then(() => console.log('\x1b[32m', `Database running on ${config.db.uri}` , '\x1b[0m'));
});
