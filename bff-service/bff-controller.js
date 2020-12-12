const axios = require('axios').default;
const NodeCache = require('node-cache');

const cache = new NodeCache();
const cacheTtl = 60 * 2; // 2 minutes
const cacheKey = 'getProductsList';

const bffHandler = (req, res) => {
  console.log(`original URL - ${req.originalUrl}`);
  console.log(`method - ${req.method}`);
  console.log(`body - ${JSON.stringify(req.body)}`);

  const recipientService = req.originalUrl.split('/')[1];
  console.log(`recipient - ${recipientService}`);

  const recipientUrl = process.env[recipientService];
  const isRequestCached = req.method === 'GET' && req.originalUrl === '/product';

  if (recipientUrl) {

    if (isRequestCached && cache.has(cacheKey)) {
      res.json(cache.get(cacheKey));
      return;
    }

    const axiosConfig = {
      method: req.method,
      url: `${recipientUrl}`,
      ...( Object.keys(req.body || {}).length > 0 && {data: req.body} ),
    };

    axios(axiosConfig)
      .then((response) => {
        res.json(response.data);
        if (isRequestCached) {
          cache.set(cacheKey, response.data, cacheTtl);
        }
      })
      .catch(err => {
        if (err.response) {
          const { status, data } = err.response;
          res.status(status).json(data);
        } else {
          res.status(500).json({ errorMessage: err.message });
        }
      })

  } else {
    res.status(502).json({ errorMessage: 'Cannot process request' })
  }

};

module.exports = {
  bffHandler
};
