const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const path = require('path');
const apiContract = require('./api-contract.json');
const {
  errorHandler,
  verifyAuthorization,
  uploadImage,
} = require('./src/middlewares');
const {
  registerController,
  loginController,
  revalidateController,
  createPackageController,
  createTransactionController,
  getPackageListController,
  getPopularPackageListController,
  getPackageDetailController,
  getUserProfileController,
  getUserPackageListController,
  getUserPackageDetailController,
  getHistoryListController,
  getHistoryDetailController,
  getOrderDetailController,
  // patchOrderController,
  getOrderListController,
  updateUserProfileController,
  updatePackageController,
  deletePackageController,
} = require('./src/controllers');

// Create Express app
const app = express();

// Middlewares
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.static('upload'));
app.use('/', swaggerUi.serve);

// Routes
app.get('/', swaggerUi.setup(apiContract));

app.route('/register').post(registerController);

app.route('/login').post(loginController);

app.route('/revalidate').get(verifyAuthorization(), revalidateController);

app
  .route('/profile')
  .get(verifyAuthorization(), getUserProfileController)
  .put(
    verifyAuthorization(),
    uploadImage(path.resolve('upload/avatar'), 'avatar'),
    updateUserProfileController,
  );

app
  .route('/profile/packages')
  .post(
    verifyAuthorization(),
    uploadImage(path.resolve('upload/thumbnail'), 'thumbnail'),
    createPackageController,
  )
  .get(verifyAuthorization(), getUserPackageListController);

app
  .route('/profile/packages/:id')
  .get(verifyAuthorization(), getUserPackageDetailController)
  .put(
    verifyAuthorization(),
    uploadImage(path.resolve('upload/thumbnail'), 'thumbnail'),
    updatePackageController,
  )
  .delete(verifyAuthorization(), deletePackageController);

app.route('/packages').get(getPackageListController);

app.route('/packages/popular').get(getPopularPackageListController);

app.route('/packages/:id').get(getPackageDetailController);

app
  .route('/packages/:id/pay')
  .post(verifyAuthorization(), createTransactionController);

app
  .route('/profile/histories')
  .get(verifyAuthorization(), getHistoryListController);

app
  .route('/profile/histories/:id')
  .get(verifyAuthorization(), getHistoryDetailController);

app.route('/profile/orders').get(verifyAuthorization(), getOrderListController);

app
  .route('/profile/orders/:id')
  .get(verifyAuthorization(), getOrderDetailController);

// Error handler
app.use(errorHandler());

module.exports = app;
