const { appointments, doctors } = require('../data/inMemoryData');

// Book an appointment
function bookAppointment({ patientFirstName, patientLastName, patientEmail, doctorName, timeSlot }) {
    if (!doctors.includes(doctorName)) {
        throw new Error('Doctor not found');
    }

    const isSlotBooked = appointments.some(
        (appointment) => appointment.doctorName === doctorName && appointment.timeSlot === timeSlot
    );

    if (isSlotBooked) {
        throw new Error('Time slot already booked');
    }

    const appointment = { patientFirstName, patientLastName, patientEmail, doctorName, timeSlot };
    appointments.push(appointment);

    return appointment;
}

// Get appointments by patient email
function getAppointmentsByEmail(email) {
    const userAppointments = appointments.filter((appt) => appt.patientEmail === email);

    if (userAppointments.length === 0) {
        throw new Error('No appointments found for this email');
    }

    return userAppointments;
}

// Get appointments by doctor name
function getAppointmentsByDoctor(doctorName) {
    if (!doctors.includes(doctorName)) {
        throw new Error('Doctor not found');
    }

    return appointments.filter((appt) => appt.doctorName === doctorName);
}

// Cancel an appointment
function cancelAppointment({ patientEmail, timeSlot }) {
    const index = appointments.findIndex(
        (appt) => appt.patientEmail === patientEmail && appt.timeSlot === timeSlot
    );

    if (index === -1) {
        throw new Error('Appointment not found');
    }

    appointments.splice(index, 1);
}

// Modify an appointment
function modifyAppointment({ patientEmail, originalTimeSlot, newTimeSlot }) {
    const appointment = appointments.find(
        (appt) => appt.patientEmail === patientEmail && appt.timeSlot === originalTimeSlot
    );

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    const isSlotTaken = appointments.some(
        (appt) => appt.doctorName === appointment.doctorName && appt.timeSlot === newTimeSlot
    );

    if (isSlotTaken) {
        throw new Error('New time slot already booked');
    }

    appointment.timeSlot = newTimeSlot;
    return appointment;
}

module.exports = {
    bookAppointment,
    getAppointmentsByEmail,
    getAppointmentsByDoctor,
    cancelAppointment,
    modifyAppointment,
};
