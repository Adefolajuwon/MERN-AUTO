// Googleapis
const { google } = require('googleapis');
require('dotenv').config();

// Pull out OAuth2 from googleapis
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
	// 1
	const oauth2Client = new OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		'https://developers.google.com/oauthplayground'
	);

	// 2
	oauth2Client.setCredentials({
		refresh_token: process.env.OAUTH_REFRESH_TOKEN,
	});

	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) {
				reject('Failed to create access token :( ' + err);
			}
			resolve(token);
		});
	});

	// 3
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: 'oadefolajuwon@gmail.com',
			accessToken,
			clientId: process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		},
	});

	// 4
	return transporter;
};
module.exports = createTransporter;
