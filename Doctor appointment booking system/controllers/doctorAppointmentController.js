const express = require('express');
const router = express.Router();
const appointmentService = require('../services/appointmentService');
const validateAppointmentRequest = require('../schema')

// Book an appointment
router.post('/', validateAppointmentRequest, (req, res) => {
    try {
        const appointment = appointmentService.bookAppointment(req.body);
        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// View appointments by patient email
router.get('/:email', (req, res) => {
    try {
        const appointments = appointmentService.getAppointmentsByEmail(req.params.email);
        res.json({ appointments });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// View all appointments for a specific doctor
router.get('/doctor/:doctorName', (req, res) => {
    try {
        const appointments = appointmentService.getAppointmentsByDoctor(req.params.doctorName);
        res.json({ appointments });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Cancel an appointment
router.delete('/', (req, res) => {
    try {
        appointmentService.cancelAppointment(req.body);
        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Modify an appointment
router.put('/', (req, res) => {
    try {
        const updatedAppointment = appointmentService.modifyAppointment(req.body);
        res.json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
