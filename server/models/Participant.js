const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
	ime: {
		type: String,
		required: true,
	},
	prezime: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Participant', ParticipantSchema);
