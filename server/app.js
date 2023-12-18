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
  patchOrderStatusController,
  getOrderListController,
  updateUserProfileController,
  updatePackageController,
  deletePackageController,
} = require('./src/controllers');

// Define routes
const router = express.Router();

router.route('/register').post(registerController);

router.route('/login').post(loginController);

router.route('/revalidate').get(verifyAuthorization(), revalidateController);

router
  .route('/profile')
  .get(verifyAuthorization(), getUserProfileController)
  .put(
    verifyAuthorization(),
    uploadImage(path.resolve('upload/avatar'), 'avatar'),
    updateUserProfileController,
  );

router
  .route('/profile/packages')
  .post(
    verifyAuthorization(),
    uploadImage(path.resolve('upload/thumbnail'), 'thumbnail'),
    createPackageController,
  )
  .get(verifyAuthorization(), getUserPackageListController);

router
  .route('/profile/packages/:id')
  .get(verifyAuthorization(), getUserPackageDetailController)
  .put(
    verifyAuthorization(),
    uploadImage(path.resolve('upload/thumbnail'), 'thumbnail'),
    updatePackageController,
  )
  .delete(verifyAuthorization(), deletePackageController);

router.route('/packages').get(getPackageListController);

router.route('/packages/popular').get(getPopularPackageListController);

router.route('/packages/:id').get(getPackageDetailController);

router
  .route('/packages/:id/pay')
  .post(verifyAuthorization(), createTransactionController);

router
  .route('/profile/histories')
  .get(verifyAuthorization(), getHistoryListController);

router
  .route('/profile/histories/:id')
  .get(verifyAuthorization(), getHistoryDetailController);

router
  .route('/profile/orders')
  .get(verifyAuthorization(), getOrderListController);

router
  .route('/profile/orders/:id')
  .get(verifyAuthorization(), getOrderDetailController)
  .patch(verifyAuthorization(), patchOrderStatusController);

router.get('/', swaggerUi.setup(apiContract));

router.use('/', swaggerUi.serve);

// Create Express app
const app = express();

// Middlewares
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.static('upload'));

app.use('/api', router);

// Error handler
app.use(errorHandler());

module.exports = app;
