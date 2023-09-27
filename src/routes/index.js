const express = require('express');

const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const websiteRoute = require('./website.routes');
const orderRoute = require('./order.routes');
const wishlistRoute = require('./wishlist.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/website',
    route: websiteRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/wishlist',
    route: wishlistRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
