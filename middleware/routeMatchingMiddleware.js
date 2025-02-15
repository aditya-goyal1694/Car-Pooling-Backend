// Middleware to calculate route match percentage
const routeMatchingMiddleware = (req, res, next) => {
    console.log("[ROUTE MATCHING] Calculating route match percentage...");
    next();
};

module.exports = routeMatchingMiddleware;
