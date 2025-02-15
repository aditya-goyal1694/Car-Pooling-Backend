const emergencyMiddleware = (req, res, next) => {
    console.log("[EMERGENCY] Ensuring emergency protocols...");
    next();
};

module.exports = emergencyMiddleware;
