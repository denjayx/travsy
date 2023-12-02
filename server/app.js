const express = require('express');
const cors = require('cors');
const path = require('path');
const {
  errorHandler,
  verifyAuthorization,
  uploadImage,
} = require('./src/middlewares');
const {
  registerController,
  loginController,
  getPackageListController,
  getPopularPackageListController,
  getPackageDetailController,
  getUserProfileController,
  getPackagesByUserController,
  getPackageDetailByUsernameController,
  insertPackageByUserController,
  updateUserProfileController,
  updatePackageDetailByUsernameController,
  deletePackagesByUsernameAndIdController,
} = require('./src/controllers');

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('upload'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travsy' });
});

app.route('/register').post(registerController);

app.route('/login').post(loginController);

app
  .route('/profile')
  .get(verifyAuthorization, getUserProfileController)
  .put(
    verifyAuthorization,
    uploadImage(path.resolve('upload/avatar'), 'avatar'),
    updateUserProfileController,
  );

app.route('/user/:username/packages').get(getPackagesByUserController);
app.route('/user/:username/packages').post(insertPackageByUserController);
app
  .route('/user/:username/packages/:id')
  .get(getPackageDetailByUsernameController);
app
  .route('/user/:username/packages/:id')
  .put(updatePackageDetailByUsernameController);
app
  .route('/user/:username/packages/:id')
  .delete(deletePackagesByUsernameAndIdController);

app.route('/packages').get(getPackageListController);

app.route('/packages/popular').get(getPopularPackageListController);

app.route('/packages/:packageId').get(getPackageDetailController);

// Error handler
app.use(errorHandler);

module.exports = app;
