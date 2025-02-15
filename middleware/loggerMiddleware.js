const fs = require('fs');
const path = require('path');

// Create a writable stream for logging requests
const logStream = fs.createWriteStream(path.join(__dirname, '../logs.txt'), { flags: 'a' });

const loggerMiddleware = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}\n`;
    console.log(log.trim()); // Log request to console
    logStream.write(log); // Write log to file
    next();
};

module.exports = loggerMiddleware;
