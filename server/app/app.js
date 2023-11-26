const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const {
  getPackageListController,
  getUserController,
  modifyUserController,
  registerController,
  getPackageDetailController,
} = require('./controllers');

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travsy' });
});

app.route('/register').post(registerController);
app.route('/user/:username').get(getUserController).put(modifyUserController);

app.route('/packages').get(getPackageListController);
app.route('/packages/:packageId').get(getPackageDetailController);

// Error handler
app.use(errorHandler);

module.exports = app;
