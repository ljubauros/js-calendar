const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoute = require('./routes/events');
const participantRoute = require('./routes/participants');

require('dotenv/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello HOME');
});

app.use('/events', eventRoute);
app.use('/participants', participantRoute);

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// keepAlive: true,
};

mongoose.connect(process.env.MONGO_URI, options, (error) => {
	if (error) {
		console.log('Failed to connect to db.');
	} else {
		console.log('Connected to db...');
	}
});

app.listen(3001, () => console.log('Server is Up and running...'));
