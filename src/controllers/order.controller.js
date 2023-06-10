const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
const pick = require('../utils/pick');

const createOrder = catchAsync(async (req, res) => {
  req.body.addedBy = req.user.id;
  req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  const order = await (await orderService.createOrder(req.body)).populate('addedBy', 'name');
  res.status(httpStatus.CREATED).send({ order });
});

const updateOrder = catchAsync(async (req, res) => {
  req.body.updatedBy = req.user.id;
  const order = await (await orderService.updateOrderById(req.params.orderId, req.body)).populate('addedBy', 'name').then((item) => item.populate('updatedBy', 'name'));
  res.status(httpStatus.OK).send({ order });
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getOrder = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryCategories(filter, options);
  res.send(result);
});

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
};
