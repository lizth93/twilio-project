const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const router = express.Router();

router.post('/voice', (request, response) => {

    const twiml = new VoiceResponse();

    twiml.say('This call is being recorded.');
    twiml.dial({
        record: 'record-from-answer-dual',
        recordingStatusCallback: 'https://samir-unresourceful-caroline.ngrok-free.dev/recording-callback',
    }, '+573153505404');

    response.type('text/xml');
    response.send(twiml.toString());
});

module.exports = router;