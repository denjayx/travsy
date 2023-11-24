const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const {
  packageListController,
  getUserController,
  modifyUserController,
  registerController,
  getPackageDetailController,
} = require('./controllers');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travsy' });
});

app.route('/register').post(registerController);
app.route('/user/:username').get(getUserController).put(modifyUserController);

app.route('/packages').get(packageListController);
app.route('/packages/:packageId').get(getPackageDetailController);

app.use(errorHandler);

module.exports = app;
