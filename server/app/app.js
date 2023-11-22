const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const {
  exampleController,
  exampleControllerError,
  packageListController,
  getUserController,
} = require('./controllers');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travsy' });
});

app.route('/user/:username').get(getUserController);
app.route('/packages').get(packageListController);

app.route('/example').get(exampleController);
app.route('/example-error').get(exampleControllerError);

app.use(errorHandler);

module.exports = app;
