// Middleware to mask sensitive user information
const privacyMiddleware = (req, res, next) => {
    if (req.user) {
        req.user.email = "hidden@example.com";  // Mask user email
        req.user.phone = "**********";         // Mask phone number
    }
    next();
};

module.exports = privacyMiddleware;
