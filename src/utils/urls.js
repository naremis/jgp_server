const { URL } = require('url');

exports.maskWebsiteURL = (url) => {
  const urlObj = new URL(url);
  const { hostname } = urlObj;

  let maskedURL = '';
  if (hostname.length < 6) {
    maskedURL = `${hostname.slice(0, -2)}**${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
  } else {
    maskedURL = `${hostname.slice(0, -3)}***${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
  }

  return maskedURL;
};
