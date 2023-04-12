function errorMiddleware(err, req, res, next) {
	// Set the response status code

	if (res.statusCode === 200) res.status(500);

	// Send the error message as JSON
	res.json({ error: err.message });
}

module.exports = errorMiddleware;
