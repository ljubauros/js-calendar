const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	naziv: {
		type: String,
		required: true,
	},
	opis: {
		type: String,
		required: false,
	},
	vreme: {
		type: String,
		required: true,
	},
	ucesnici: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
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
