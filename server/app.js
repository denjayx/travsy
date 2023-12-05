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
  createPackageByUserController,
  createTransactionController,
  getPackageListController,
  getPopularPackageListController,
  getPackageDetailController,
  getUserProfileController,
  getPackagesByUserController,
  getPackageDetailByUsernameController,
  getTransactionHistoriesController,
  getDetailTransactionHistoriesController,
  getOrderController,
  getOrderControllerById,
  patchOrderController,
  getOrderListContoller,
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
app.use('/', swaggerUi.serve);

// Routes
app.get('/', swaggerUi.setup(apiContract));

app.route('/register').post(registerController);

app.route('/login').post(loginController);

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
    uploadImage(path.resolve('upload/thumbnail', 'thumbnail')),
    createPackageByUserController,
  )
  .get(verifyAuthorization(), getPackagesByUserController);

app
  .route('/profile/packages/:id')
  .get(verifyAuthorization(), getPackageDetailByUsernameController)
  .put(verifyAuthorization(), updatePackageDetailByUsernameController)
  .delete(verifyAuthorization(), deletePackagesByUsernameAndIdController);

app.route('/prodile/orders').get(verifyAuthorization(), getOrderListContoller);

app.route('/packages').get(getPackageListController);

app.route('/packages/popular').get(getPopularPackageListController);

app.route('/packages/:id').get(getPackageDetailController);

// Transaction service
app.route('/user/:username/histories').get(getTransactionHistoriesController);
app
  .route('/user/:username/histories/:id')
  .get(getDetailTransactionHistoriesController);

app.route('/user/:username/orders').get(getOrderController);
app.route('/user/:username/orders/:id').get(getOrderControllerById);
app.route('/user/:username/orders/:id').patch(patchOrderController);

app
  .route('/packages/:id/pay')
  .post(verifyAuthorization(), createTransactionController);

// Error handler
app.use(errorHandler());

module.exports = app;
