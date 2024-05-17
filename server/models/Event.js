const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	time: {
		type: String,
		required: true,
	},
	participants: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
	],
	day: {
		type: Number,
		required: true,
	},
	month: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Event', EventSchema);
