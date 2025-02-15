// Middleware to validate carpool requests
const poolMiddleware = (req, res, next) => {
    console.log("[POOL] Validating carpool request...");
    next();
};

module.exports = poolMiddleware;
