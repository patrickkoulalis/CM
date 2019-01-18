// let's go!
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });

const createServer = require('./createServer');

const db = require('./db');

const server = createServer();

// TODO: Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());
// TODO: Use Express middleware to populate current user
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  info => {
    console.log(`Server running on port http://localhost:${info.port}`);
  }
);
