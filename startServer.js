// Start script for the server.

// Import server
const server = require('server');

// Get port from .env or initialize it to magic number
const port = process.env.PORT || 1234;

// Start server
server.listen(port, _ => {
    console.log(`API listening on port ${port}`);
});
