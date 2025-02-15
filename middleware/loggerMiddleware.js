const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../logs.txt'), { flags: 'a' });

const loggerMiddleware = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}\n`;
    console.log(log.trim());
    logStream.write(log);
    next();
};

module.exports = loggerMiddleware;
