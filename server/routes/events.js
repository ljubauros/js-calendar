const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
	try {
		const events = await Event.find({
			month: req.query.month,
			year: req.query.year,
		});
		res.json(events);
	} catch (err) {
		res.status(400).json({ message: err });
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	try {
		let event = req.body;
		const newEvent = new Event({
			naziv: event.naziv,
			opis: event.opis,
			vreme: event.vreme,
			ucesnici: event.ucesnici,
			day: event.day,
			month: event.month,
			year: event.year,
		});

		let createdEvent = await newEvent.save();
		res.json(createdEvent);
	} catch (err) {
		res.status(400).json({ message: err });
		console.log(err);
	}
});

module.exports = router;
