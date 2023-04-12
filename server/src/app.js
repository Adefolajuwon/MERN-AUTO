const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const authRouter = require('./routes/auth.route');
const errorMiddleware = require('./middlewares/error.middleware');

app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('combined'));
app.use('/api/auth', authRouter);
app.use(
	'/*',
	express.static(path.join(__dirname, '..', 'public', 'index.html'))
);

app.use(errorMiddleware);

module.exports = app;
