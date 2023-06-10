const sanitizeUser = (req, res, next) => {
  req.body.email = req.body.email.trim().toLowerCase();
  const tempNameArray = [];
  const nameSplit = req.body.name.split(' ');
  nameSplit.forEach((e) => {
    if (e.length > 0) {
      const sanitizedValue = e.trim().toLowerCase();
      tempNameArray.push(sanitizedValue.charAt(0).toUpperCase() + sanitizedValue.slice(1));
    }
  });
  req.body.name = tempNameArray.join(' ');
  next();
};

const sanitizeOrder = (req, res, next) => {
  const tempNameArray = [];
  const nameSplit = req.body.name.split(' ');
  nameSplit.forEach((e) => {
    if (e.length > 0) {
      const sanitizedValue = e.trim().toLowerCase();
      tempNameArray.push(sanitizedValue.charAt(0).toUpperCase() + sanitizedValue.slice(1));
    }
  });
  req.body.name = tempNameArray.join(' ');
  next();
};

module.exports = {
  sanitizeUser,
  sanitizeOrder,
};
