const NodeCache = require('node-cache');
const cache = new NodeCache();

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        return res.json(cachedResponse);
    }

    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(key, body, 600); // Cache for 10 minutes
        res.sendResponse(body);
    };

    next();
};

module.exports = cacheMiddleware;
