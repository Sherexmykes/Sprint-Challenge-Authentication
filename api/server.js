const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const userRouter = require('../users/user-router.js')

const server = express();

server.use(morgan("short"))
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', userRouter)

server.get("/", (req, res, next) => {
    res.send("<h2>The Server Is Being Tested!</h2>")
  })
  
  server.use((req, res, next) => {
    res.status(404).json({ message: "What you were searching does not exist. Please try your request again/"})
  })
  
  server.use((err, req, res, next) => {
    res.status(500).json({ message: "Blame it on the server. Not a user error."})
  })

module.exports = server;
