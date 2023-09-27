const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const websiteValidation = require('../validations/website.validation');
const websiteController = require('../controllers/website.controller');

const router = express.Router();

// routes for admin

router
  .route('/')
  .get(auth('admin'), validate(websiteValidation.getWebsites), websiteController.getWebsites)
  .put(auth('admin'), validate(websiteValidation.filterWebsites), websiteController.filterWebsites)
  .post(auth('admin'), validate(websiteValidation.createWebsite), websiteController.createWebsite);

// route that will be used by admin only
router.route('/:websiteId')
  .put(auth('admin'), validate(websiteValidation.updateWebsite), websiteController.updateWebsite)
  .delete(auth('admin'), websiteController.deleteWebsite);
/*
  * route that will be used to get websites by the customer
  * other than that most routes regarding website are only for admin to mess with
*/
router
  .route('/public')
  .get(validate(websiteValidation.getWebsites), websiteController.getPublicWebsites);

module.exports = router;
