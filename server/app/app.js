const express = require('express');
const cors = require('cors');
const { errorHandler, verifyAuthorization } = require('./middlewares');
const {
  registerController,
  loginController,
  getPackageListController,
  getPopularPackageListController,
  getPackageDetailController,
  getUserProfileController,
  getPackagesByUserController,
  insertPackageByUserController,
  updateUserProfileController,
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

app
  .route('/profile')
  .get(verifyAuthorization, getUserProfileController)
  .put(verifyAuthorization, updateUserProfileController);

app.route('/user/:username/packages').get(getPackagesByUserController);
app.route('/user/:username/packages').post(insertPackageByUserController);

app.route('/packages').get(getPackageListController);

app.route('/packages/popular').get(getPopularPackageListController);

app.route('/packages/:packageId').get(getPackageDetailController);

// Error handler
app.use(errorHandler);

module.exports = app;
