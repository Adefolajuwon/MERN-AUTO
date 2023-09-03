require('dotenv').config();
const express = require('express');
const session = require('express-session');

const passportInstance = require('../lib/passport');
const {
	controllerAuthGoogle,
	controllerInsertUser,
	controllerVerifyUserCredentials,
	controllerFetchLoggedInUser,
	sendEmail,
} = require('../controllers/user.controller');

const authRouter = express.Router();

authRouter.use(
	session({
		secret: process.env.SESSION_TOKEN,
		resave: false,
		saveUninitialized: false,
	})
);
authRouter.use(passportInstance.initialize());
authRouter.use(passportInstance.session());

authRouter.get(
	'/google',
	passportInstance.authenticate('google', { scope: ['email', 'profile'] })
);
authRouter.get(
	'/google/callback',
	passportInstance.authenticate('google', { failureRedirect: '/register' }),
	controllerAuthGoogle
);
authRouter.post('/sendemail', sendEmail);

authRouter.post('/local/register', controllerInsertUser);
authRouter.get('/verify', controllerFetchLoggedInUser);
authRouter.post('/local/login', controllerVerifyUserCredentials);

module.exports = authRouter;
