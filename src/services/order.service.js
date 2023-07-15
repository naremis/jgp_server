const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an order
 * @param {Object} orderData
 * @returns {Promise<Order>}
 */
const createOrder = async (orderData) => {
  const order = await Order.create(orderData);
  return order;
};

/**
 * Get order by ID
 * @param {string} orderId
 * @returns {Promise<Order>}
 */
const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
};

/**
 * Update order by ID
 * @param {string} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by ID
 * @param {string} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  await order.remove();
  return order;
};

/**
 * Get orders for a user
 * @param {string} userId
 * @returns {Promise<[Order]>}
 */
const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ user: userId });
  return orders;
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrdersByUser,
};
