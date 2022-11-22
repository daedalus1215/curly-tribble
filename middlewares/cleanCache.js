const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
    await next(); // make sure we call the next function (in this case the route handler). Once execution in the RH is done, we will come back into this middleware. This allows us to clear our cache after the request handler is done it's work.
    
};