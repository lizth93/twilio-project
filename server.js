const express = require('express');
const app = express();

const voiceRoutes = require('./routes/answer_phone');
const recordingRoutes = require('./routes/recording_callback');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', voiceRoutes);
app.use('/', recordingRoutes);

app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});
