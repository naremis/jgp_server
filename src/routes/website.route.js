const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const websiteValidation = require('../validations/website.validation');
const websiteController = require('../controllers/website.controller');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(websiteValidation.getWebsites), websiteController.getWebsites)
  .put(auth('verified'), validate(websiteValidation.filterWebsites), websiteController.filterWebsites)
  .post(auth('verified'), validate(websiteValidation.createWebsite), websiteController.createWebsite);

router
  .route('/public')
  .get(validate(websiteValidation.getWebsites), websiteController.getPublicWebsites);

router.route('/:websiteId')
  .put(auth('verified'), validate(websiteValidation.updateWebsite), websiteController.updateWebsite)
  .delete(auth('verified'), websiteController.deleteWebsite);

module.exports = router;
