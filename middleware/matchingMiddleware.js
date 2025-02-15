// Middleware to check ride compatibility
const matchingMiddleware = (req, res, next) => {
    console.log("[MATCHING] Checking ride compatibility...");
    next();
};

module.exports = matchingMiddleware;
