const { URL } = require('url');

exports.maskURL = (_website) => {
  const isMultiple = Array.isArray(_website);

  const maskSingle = (website) => {
    const urlObj = new URL(website.url);
    const { hostname } = urlObj;
    const tld = hostname.split('.').pop();
    let maskedURL = '';
    maskedURL = `${urlObj.origin.replace(urlObj.host, urlObj.host.replace(urlObj.host.slice(0, urlObj.host.split('.')[0].length - 2), '*****'))}`;

    return {
      ...website.toJSON(),
      url: maskedURL,
      tld,
    };
  };

  if (isMultiple) {
    return _website.map((website) => maskSingle(website));
  }
  return maskSingle(_website);
};
