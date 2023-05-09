require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createTransporter = require('../email.js');
const {
	storeGoogleUser,
	insertNewUser,
	fetchUserByEmail,
} = require('../models/users.model');

async function controllerAuthGoogle(req, res, next) {
	try {
		if (!req.isAuthenticated()) {
			res.redirect(`/login?success=false&message=Authentication failed`);
			return;
		}
		req.session.profile = req.user;
		// Add user to database if user doesn't exists.
		let response = await storeGoogleUser(req.user);
		if (response?.error) {
			res.redirect(`/login?success=false&message=Authentication failed`);
			return;
		}
		let token = jwt.sign(
			{ _id: response._id, email: response.email },
			process.env.JWT_SECRET,
			{ expiresIn: '2h' }
		);

		// Send back a web token to be used for authentication
		res.redirect(`/login?success=true&token=${token}`);
	} catch (e) {
		res.redirect(`/login?success=false&message=Authentication failed`);
	}
	next();
}
async function sendEmail(req, res, next) {
	const recipient = 'adefolajuwonoyebola1@gmail.com';
	// const mailSubject = req.body.subject;
	// const mailBody = req.body.message;

	// Mail options
	let mailOptions = {
		from: 'oadefolajuwon@gmail.com',
		to: recipient,
		subject: 'welcome to out company.',
		text: 'We are happy for you my boy.',
	};

	try {
		// Get response from the createTransport
		let emailTransporter = await createTransporter();

		// Send email
		emailTransporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				// failed block
				console.log(error);
			} else {
				// Success block
				console.log('Email sent: ' + info.response);
				return res.redirect('/success.html');
			}
		});
	} catch (error) {
		return console.log(error);
	}
}
async function controllerInsertUser(req, res) {
	try {
		let { name, email, password, provider } = req.body;
		if ((!name, !email, !password, !provider)) {
			res.status(400).json({ error: 'Please provide all credentials' });
			return;
		}

		// Hash user's password
		req.body.password = await bcrypt.hash(req.body.password, 10);
		let response = await insertNewUser(req.body);
		if (response.error) {
			res.status(400).json(response);
			return;
		}
		res.status(200).json(req.body);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
}

async function controllerVerifyUserCredentials(req, res) {
	try {
		let { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({ error: 'Please provide all credentials' });
			return;
		}
		// Fetch user
		let exists = await fetchUserByEmail(email);
		if (!exists) {
			res.status(404).json({
				error: 'User not found. Please check credentials and try again.',
			});
			return;
		}
		console.log(exists);

		if (exists.provider !== 'local') {
			res.status(401).json({
				error: 'Account is associated with google please sign in with google',
			});
			return;
		}

		// Compare password
		let valid = await bcrypt.compare(password, exists.password);
		if (!valid) {
			res.status(404).json({
				error:
					'Invalid user credentials. Please check credentials and try again.',
			});
			return;
		}

		// Create a token
		let token = await jwt.sign(
			{ _id: exists._id, email: exists.email },
			process.env.JWT_SECRET,
			{ expiresIn: '30d' }
		);

		res.status(200).json({ success: true, token });
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
}

async function controllerFetchLoggedInUser(req, res) {
	// Check header for token
	try {
		let auth = req.headers.authorization;
		if (!auth || !auth.startsWith('Bearer ')) {
			res.status(401).json({ error: 'User not authenticated' });
			return;
		}

		auth = auth.split(' ');
		let token = auth[1];

		let user = jwt.verify(token, process.env.JWT_SECRET);
		if (!user._id && !user.email) {
			res.status(401).json({ error: 'Invalid authentication token' });
			return;
		}

		user = await fetchUserByEmail(user.email);
		if (!user) {
			res.status(401).json({ error: 'An error occurred' });
			return;
		}
		delete user.password;

		res.status(200).json(user);
	} catch (e) {
		res.status(401).json({ error: 'An error occurred' });
	}
}

module.exports = {
	controllerAuthGoogle,
	controllerInsertUser,
	controllerVerifyUserCredentials,
	controllerFetchLoggedInUser,
	sendEmail,
};
