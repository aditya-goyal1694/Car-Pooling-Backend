const NodeCache = require('node-cache');
const cache = new NodeCache();

// Middleware to cache responses
const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        return res.json(cachedResponse); // Return cached response if available
    }

    // Override res.json to store response in cache before sending it
    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(key, body, 600); // Cache response for 10 minutes
        res.sendResponse(body);
    };

    next();
};

module.exports = cacheMiddleware;
