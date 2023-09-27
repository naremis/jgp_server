const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const wishlistValidation = require('../validations/wishlist.validation');
const wishListController = require('../controllers/wishlist.controller');

const router = express.Router();

router.route('/')
  .get(auth(), wishListController.getWishlist)
  .post(auth(), validate(wishlistValidation.addToWishlist), wishListController.addToWishlist)
  .delete(
    auth(),
    validate(wishlistValidation.removeFromWishlist),
    wishListController.removeFromWishlist,
  );

module.exports = router;
