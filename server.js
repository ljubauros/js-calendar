const express = require('express');
const next = require('next');

const dbEvents = [
    {
        id: 1,
        naslov: 'e1',
        opis: 'prvi dogadjaj',
        day: 2,
        month: 11,
        year: 2021,
    },
    {
        id: 2,
        naslov: 'e2',
        opis: 'drugi dogadjaj',
        day: 5,
        month: 11,
        year: 2021,
    },
    {
        id: 3,
        naslov: 'e3',
        opis: 'treci dogadjaj',
        day: 2,
        month: 11,
        year: 2021,
    },
    {
        id: 4,
        naslov: 'e4',
        opis: 'cetvrti dogadjaj',
        day: 21,
        month: 11,
        year: 2021,
    },
];

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/events', (req, res) => {
        res.send(
            dbEvents.filter(
                (event) => event.day == req.query.day && event.month == req.query.month && event.year == req.query.year,
            ),
        );
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
