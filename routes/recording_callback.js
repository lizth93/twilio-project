const { Pool } = require('pg');
const express = require('express');
const { transcribirConGoogle } = require('./transcription_google');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'twilio_db',
    password: 'twilio-1234',
    port: 5432,
});

const router = express.Router();
router.post('/recording-callback', async (req, res) => {
    const { RecordingUrl, RecordingSid, CallSid } = req.body;
    try {
        const transcript = await transcribirConGoogle(RecordingUrl);
        await pool.query(
            `INSERT INTO recordings (recording_sid, call_sid, recording_url, transcript)
             VALUES ($1, $2, $3, $4)`,
            [RecordingSid, CallSid, RecordingUrl, transcript]
        );

        res.status(200).send('OK');
    } catch (error) {
        console.error('Error saving in DB:', error);
        res.status(500).send('DB error');
    }

});

module.exports = router;