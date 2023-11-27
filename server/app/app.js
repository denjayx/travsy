const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const {
  registerController,
  loginController,
  getPackageListController,
  getPopularPackageListController,
  getPackageDetailController,
  getUserController,
  modifyUserController,
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
app.route('/login').post(loginController);
app.route('/user/:username').get(getUserController).put(modifyUserController);

app.route('/packages').get(getPackageListController);
app.route('/packages/popular').get(getPopularPackageListController);
app.route('/packages/:packageId').get(getPackageDetailController);

// Error handler
app.use(errorHandler);

module.exports = app;
