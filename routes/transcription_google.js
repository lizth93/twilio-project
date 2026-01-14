require('dotenv').config();
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

async function transcribirConGoogle(recordingUrl) {
 const audioResponse = await fetch(`${recordingUrl}.mp3`, 
    { headers: { Authorization: 'Basic ' + Buffer.from( process.env.TWILIO_ACCOUNT_SID + ':' + process.env.TWILIO_AUTH_TOKEN ).toString('base64'), }, });

  const arrayBuffer = await audioResponse.arrayBuffer();    
  const audioBuffer = Buffer.from(arrayBuffer);

  const audio = {
    content: audioBuffer.toString('base64'),
  };

  const config = {
    encoding: 'MP3',
    sampleRateHertz: 8000, 
    languageCode: 'es-CO',
  };

  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

  return transcription;
}

module.exports = { transcribirConGoogle };
