// Implementation for the express server

// .env init
const dotenv = require('dotenv');
dotenv.config();

// Package imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Route imports
const onboardingRoutes = require('./routes/onboardingRoutes');

// Server init
const server = express();

// Server middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// Server routes
server.use('/api/onboarding', onboardingRoutes);

// Export server for use in scripts
module.exports = server;
