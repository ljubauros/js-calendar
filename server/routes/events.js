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

router.get('/findById', async (req, res) => {
	try {
		const event = await Event.findById(req.query.id);
		res.json(event);
	} catch (err) {
		res.status(400).json({ message: err });
		console.log(err);
	}
});

// router.delete('/', async (req, res) => {
// 	try {
// 		await Event.deleteMany({});
// 		res.status(200).send('deleted all');
// 	} catch (err) {
// 		res.status(400).json({ message: err });
// 		console.log(err);
// 	}
// });

router.delete('/', async (req, res) => {
	try {
		await Event.deleteOne({ _id: req.query.id });
		res.status(200).send('deleted all');
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
