// let's go!

require('dotenv').config({path: 'variables.env'});

const createServer = require('./createServer');

const db = require('./db');

const server = createServer();

// TODO: Use express middleware to handel cookies (JWT)
// TODO: Use Express middleware to populate current user

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		},
	},
	info => {
		console.log(`Server running on port http://localhost:${info.port}`);
	}
);