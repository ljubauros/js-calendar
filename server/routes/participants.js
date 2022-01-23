const { response } = require('express');
const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');

router.post('/', async (req, res) => {
	try {
		let ucesnik = req.body;
		const newParticipant = new Participant({
			ime: ucesnik.ime,
			prezime: ucesnik.prezime,
		});
		await newParticipant.save();
		res.status(200).send('ok');
	} catch (err) {
		res.status(400).json({ message: err });
		console.log(err);
	}
});

router.delete('/', async (req, res) => {
	try {
		await Participant.deleteMany({});
		res.status(200).send('deleted all');
	} catch (err) {
		res.status(400).json({ message: err });
		console.log(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const participants = await Participant.find();
		res.json(participants);
	} catch (err) {
		res.status(400).json({ message: err });
		console.log(err);
	}
});

router.get('/findById', async (req, res) => {
	try {
		const participants = await Participant.findById(req.query.id);
		res.json(participants);
	} catch (err) {
		res.status(400).json({ message: err });
		console.log(err);
	}
});

module.exports = router;
