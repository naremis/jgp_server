const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { wishlistService } = require('../services');

const addToWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.addToWishlist(req.user, req.body.website);
  res.status(httpStatus.CREATED).send({ wishlist });
});

const removeFromWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.removeFromWishlist(req.user, req.body.website);
  res.status(httpStatus.OK).send({ wishlist });
});

const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user);
  res.status(httpStatus.OK).send({ wishlist });
});

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
