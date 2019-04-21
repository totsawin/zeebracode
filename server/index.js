const keys = require('./keys');
const validate = require('uuid-validate');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgress Client Setup
const maxCounter = 5;
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG Connection'));
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));

// Express Route Handlers

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

// FIXME: DELETE BEFORE PUSH TO PRODUCTION
app.get('/codes', async(req, res) => {
    const { rows } = await pgClient.query('SELECT * FROM codes');
    res.send(rows);
});

app.get('/codes/:id', async(req, res) => {
    const id = req.params.id
    if ( !(validate(id, 1) || validate(id, 4)) ) {
        return res.status(404).send({ error: `This is not our product` });
    }
    // console.log('id = ' + id);
    const { rows } = await pgClient.query('SELECT code, counter FROM codes WHERE code = $1', [id]);
    const code = rows.length ? rows[0].code: null ;
    const counter = rows.length ? rows[0].counter: null;

    if (code) {
        /*if (counter < maxCounter) {
            res.status(200).send(`Product is genuine`);
        } else {
            res.status(200).send(`Fake Alert! This product is scanned too many times`);
        }
        const updateCounter = await pgClient.query('UPDATE codes SET counter = $1 WHERE code = $2', [counter + 1, code]);
        console.log(updateCounter);*/
        res.status(200).send({"data": rows[0]});
        await pgClient.query('UPDATE codes SET counter = $1 WHERE code = $2', [counter + 1, code]);
    } else {
        return res.status(404).send({ error: `This is not our product` });
    }
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});