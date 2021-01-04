const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const config = require('./config/key');

// mongodb connection config
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('MongoDB is connected...'))
  .catch(error => console.error('MongoDB connecting ERROR:: ', error));

app.use(cors());

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

app.use(cookieParser());

// using api start ----------------------------------
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', require('./routes/user'));
// using api end ------------------------------------

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('client/build'));

  // index.html for all page routes    html or routing and naviagtion
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
};

const port = 5000;
app.listen(port, () => {
  console.log(`Dukhu server is listening at http://localhost:${port}`);
});
