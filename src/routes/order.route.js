const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const orderValidation = require('../validations/order.validation');
const orderController = require('../controllers/order.controller');
const sanitize = require('../middlewares/sanitize');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(orderValidation.getOrder), orderController.getOrder)
  .post(auth('verified'), validate(orderValidation.createOrder), sanitize.sanitizeOrder, orderController.createOrder);

router.route('/:orderId')
  .put(auth('verified'), validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(auth('verified'), orderController.deleteOrder);

module.exports = router;
