Twilio Voice Webhook – Local Express Server Setup

This project contains a simple Express server that responds to Twilio incoming call webhooks using TwiML.

When someone calls your Twilio phone number, Twilio will send an HTTP request to your webhook URL, and this server will respond with a voice message.

## Requirements

Node.js v18+

npm

A Twilio account

A Twilio phone number (Voice enabled)

Ngrok (installed globally)

## Run

Install dependencies with npm install
Run the Express Server and run ngrok

node server.js
ngrok http 3000
