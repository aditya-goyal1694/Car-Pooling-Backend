const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const NodeCache = require('node-cache');
const fs = require('fs');
const path = require('path');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const carpoolRoutes = require('./routes/carpoolRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('./middleware/loggerMiddleware');
const monitor = require('./middleware/monitorMiddleware');
const privacyMiddleware = require('./middleware/privacyMiddleware');
const matchingMiddleware = require('./middleware/matchingMiddleware');
const emergencyMiddleware = require('./middleware/emergencyMiddleware');
const cacheMiddleware = require('./middleware/cacheMiddleware');
const poolMiddleware = require('./middleware/poolMiddleware');
const routeMatchingMiddleware = require('./middleware/routeMatchingMiddleware');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cache = new NodeCache();

// Security & Performance Enhancements
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limiting
app.use(logger);
app.use(monitor);
app.use(privacyMiddleware);
app.use(matchingMiddleware);
app.use(emergencyMiddleware);
app.use(cacheMiddleware);
app.use(poolMiddleware);
app.use(routeMatchingMiddleware);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/carpool', carpoolRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
