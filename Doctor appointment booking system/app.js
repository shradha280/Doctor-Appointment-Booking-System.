const express = require('express');
const bodyParser = require('body-parser');
const appointmentController = require('./controllers/doctorAppointmentController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.use('/appointments', appointmentController);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
