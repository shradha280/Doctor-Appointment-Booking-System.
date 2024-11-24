# Doctor Appointment Booking System

A simple REST API built with **Node.js** for managing doctor appointments. This application allows patients to book, view, modify, and cancel appointments with doctors. It uses an in-memory data structure for simplicity.

## Features

- **Book an Appointment**: Schedule a time slot with a specific doctor.
- **View Appointment Details**: Retrieve appointment information by patient email.
- **View All Appointments for a Doctor**: List all appointments for a specific doctor.
- **Cancel an Appointment**: Remove a scheduled appointment.
- **Modify an Appointment**: Change the time slot of an existing appointment.

## Prerequisites

- [Node.js](https://nodejs.org) (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd doctor-appointment-system
2. Install dependencies:
   ```bash
    npm install
    The server will run at http://localhost:3000.
4. Test Coverage
   ```bash
    To generate a test coverage report:
    npm test -- --coverage
