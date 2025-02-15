const privacyMiddleware = (req, res, next) => {
    if (req.user) {
        req.user.email = "hidden@example.com";  // Example of masking user email
        req.user.phone = "**********";         // Mask phone number
    }
    next();
};

module.exports = privacyMiddleware;
