const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { websiteService } = require('../services');
const pick = require('../utils/pick');
const { maskURL } = require('../utils/urls');

const createWebsite = catchAsync(async (req, res) => {
  const websites = await websiteService.createWebsite(req.body);
  res.status(httpStatus.CREATED).send({ websites });
});

const getWebsites = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'domainAuthority',
    'domainRating',
    'domainType',
    'url',
    'categories',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await websiteService.queryWebsites(filter, options);
  res.send(result);
});

const getPublicWebsites = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'domainAuthority',
    'domainRating',
    'domainType',
    'url',
    'categories',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await websiteService.queryWebsites(filter, options);
  const publicResults = maskURL(result.results);
  res.send(publicResults);
});

const filterWebsites = catchAsync(async (req, res) => {
  const result = await websiteService.filterWebsites(req.body);
  res.send(result);
});

const updateWebsite = catchAsync(async (req, res) => {
  const website = await websiteService.updateWebsiteById(req.params.websiteId, req.body);
  res.status(httpStatus.CREATED).send({ website });
});

const deleteWebsite = catchAsync(async (req, res) => {
  await websiteService.deleteWebsiteById(req.params.websiteId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWebsite,
  getWebsites,
  updateWebsite,
  deleteWebsite,
  filterWebsites,
  getPublicWebsites,
};
