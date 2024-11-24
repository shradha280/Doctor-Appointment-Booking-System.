const appointmentService = require('./appointmentService');
const { appointments, doctors } = require('../data/inMemoryData');

beforeEach(() => {
  // Reset the in-memory data before each test
  appointments.length = 0;
  doctors.splice(0, doctors.length, 'Dr. Shradha', 'Dr. Johnson', 'Dr. Williams');
});

describe('Appointment Service', () => {
  describe('bookAppointment', () => {

    it('should throw an error if the doctor agrawals not exist', () => {
      const invalidAppointment = {
        patientFirstName: 'jenna',
        patientLastName: 'agrawal',
        patientEmail: 'jenna.agrawal@example.com',
        doctorName: 'Dr. NonExistent',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      expect(() => appointmentService.bookAppointment(invalidAppointment)).toThrow('Doctor not found');
    });

    it('should book an appointment successfully', () => {
      const newAppointment = {
        patientFirstName: 'John',
        patientLastName: 'agrawal',
        patientEmail: 'john.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      const result = appointmentService.bookAppointment(newAppointment);
      expect(result).toEqual(newAppointment);
      expect(appointments).toContainEqual(newAppointment);
    });

    it('should throw an error if the time slot is already booked', () => {
      const appointment = {
        patientFirstName: 'John',
        patientLastName: 'agrawal',
        patientEmail: 'john.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      appointmentService.bookAppointment(appointment);

      expect(() => appointmentService.bookAppointment(appointment)).toThrow('Time slot already booked');
    });
  });

  describe('getAppointmentsByEmail', () => {
    it('should return appointments for a given email', () => {
      const appointment = {
        patientFirstName: 'John',
        patientLastName: 'agrawal',
        patientEmail: 'john.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      appointments.push(appointment);

      const result = appointmentService.getAppointmentsByEmail('john.agrawal@example.com');
      expect(result).toEqual([appointment]);
    });

    it('should throw an error if no appointments are found', () => {
      expect(() => appointmentService.getAppointmentsByEmail('nonexistent@example.com')).toThrow(
        'No appointments found for this email'
      );
    });
  });

  describe('getAppointmentsByDoctor', () => {
    it('should return appointments for a specific doctor', () => {
      const appointment = {
        patientFirstName: 'John',
        patientLastName: 'agrawal',
        patientEmail: 'john.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      appointments.push(appointment);

      const result = appointmentService.getAppointmentsByDoctor('Dr. Shradha');
      expect(result).toEqual([appointment]);
    });

    it('should throw an error if the doctor agrawals not exist', () => {
      expect(() => appointmentService.getAppointmentsByDoctor('Dr. NonExistent')).toThrow('Doctor not found');
    });
  });

  describe('cancelAppointment', () => {
    it('should cancel an appointment successfully', () => {
      const appointment = {
        patientFirstName: 'John',
        patientLastName: 'agrawal',
        patientEmail: 'john.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      appointments.push(appointment);

      appointmentService.cancelAppointment({
        patientEmail: 'john.agrawal@example.com',
        timeSlot: '10:00 AM - 11:00 AM',
      });

      expect(appointments).not.toContainEqual(appointment);
    });

    it('should throw an error if the appointment is not found', () => {
      expect(() =>
        appointmentService.cancelAppointment({
          patientEmail: 'john.agrawal@example.com',
          timeSlot: '10:00 AM - 11:00 AM',
        })
      ).toThrow('Appointment not found');
    });
  });

  describe('modifyAppointment', () => {
    it('should modify an appointment successfully', () => {
      const appointment = {
        patientFirstName: 'John',
        patientLastName: 'agrawal',
        patientEmail: 'john.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      appointments.push(appointment);

      const updatedAppointment = appointmentService.modifyAppointment({
        patientEmail: 'john.agrawal@example.com',
        originalTimeSlot: '10:00 AM - 11:00 AM',
        newTimeSlot: '11:00 AM - 12:00 PM',
      });

      expect(updatedAppointment.timeSlot).toBe('11:00 AM - 12:00 PM');
    });

    it('should throw an error if the original appointment is not found', () => {
      expect(() =>
        appointmentService.modifyAppointment({
          patientEmail: 'nonexistent@example.com',
          originalTimeSlot: '10:00 AM - 11:00 AM',
          newTimeSlot: '11:00 AM - 12:00 PM',
        })
      ).toThrow('Appointment not found');
    });

    it('should throw an error if the new time slot is already booked', () => {
      const appointment1 = {
        patientFirstName: 'John',
        patientLastName: 'agrawal',
        patientEmail: 'john.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '10:00 AM - 11:00 AM',
      };

      const appointment2 = {
        patientFirstName: 'jenna',
        patientLastName: 'agrawal',
        patientEmail: 'jenna.agrawal@example.com',
        doctorName: 'Dr. Shradha',
        timeSlot: '11:00 AM - 12:00 PM',
      };

      appointments.push(appointment1, appointment2);

      expect(() =>
        appointmentService.modifyAppointment({
          patientEmail: 'john.agrawal@example.com',
          originalTimeSlot: '10:00 AM - 11:00 AM',
          newTimeSlot: '11:00 AM - 12:00 PM',
        })
      ).toThrow('New time slot already booked');
    });
  });
});
