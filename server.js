// Import required modules
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

// Import middleware and routes
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

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const cache = new NodeCache();

// Apply security and performance middleware
app.use(helmet()); // Security headers
app.use(compression()); // Response compression
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limiting
app.use(logger); // Custom logging
app.use(monitor); // Request monitoring
app.use(privacyMiddleware); // User data protection
app.use(matchingMiddleware); // Ride matching
app.use(emergencyMiddleware); // Emergency protocols
app.use(cacheMiddleware); // Response caching
app.use(poolMiddleware); // Carpool validation
app.use(routeMatchingMiddleware); // Route optimization

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Set up routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/carpool', carpoolRoutes); // Carpool routes

// Error handling middleware
app.use(notFound); // 404 handler
app.use(errorHandler); // General error handler

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
