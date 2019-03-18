// Implementation for the express server

// .env init
const dotenv = require('dotenv');
dotenv.config();

// Package imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Integration imports
const Emailer = require('./integrations/emailer');
const Texter = require('./integrations/texter');

// Route imports
const onboardingRoutes = require('./routes/onboardingRoutes');

// Server init
const server = express();

// Server middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// Server shared variables
server.set('emailer', new Emailer());
server.set('texter', new Texter());

// Server routes
server.use('/api/onboarding', onboardingRoutes);

// Export server for use in scripts
module.exports = server;
