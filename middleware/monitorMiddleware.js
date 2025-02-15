const monitorMiddleware = (req, res, next) => {
    console.log(`[MONITOR] ${req.method} request to ${req.url}`);
    next();
};

module.exports = monitorMiddleware;
