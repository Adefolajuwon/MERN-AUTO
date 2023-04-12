const https = require('https');
const app = require('./app');

const { startMongoose } = require('./lib/mongoose');
const certData = require('./cert/cert.data');

const PORT = process.env.PORT || 8000;
const server = https.createServer(certData, app);

(async function () {
	await startMongoose();
	server.listen(PORT, () => {
		console.log(`Server started on PORT ${PORT}...`);
	});
})();
