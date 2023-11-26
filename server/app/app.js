const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const {
  getPackageListController,
  getPopularPackageListController,
  getPackageDetailController,
  getUserController,
  modifyUserController,
  registerController,
  getPackagesByUserController,
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
app.route('/user/:username/packages').get(getPackagesByUserController);

app.route('/packages').get(getPackageListController);
app.route('/packages/popular').get(getPopularPackageListController);
app.route('/packages/:packageId').get(getPackageDetailController);

// Error handler
app.use(errorHandler);

module.exports = app;
