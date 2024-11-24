const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();

addFormats(ajv);

const appointmentSchema = 
    {
        "type": "object",
        "properties": {
          "patientFirstName": {
            "type": "string",
            "minLength": 1,
            "description": "The first name of the patient."
          },
          "patientLastName": {
            "type": "string",
            "minLength": 1,
            "description": "The last name of the patient."
          },
          "patientEmail": {
            "type": "string",
            "format": "email",
            "description": "The email address of the patient."
          },
          "doctorName": {
            "type": "string",
            "description": "The name of the doctor with whom the appointment is booked."
          },
          "timeSlot": {
            "type": "string",
            "pattern": "^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM) - (0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$",
            "description": "The appointment time slot in the format 'HH:MM AM/PM - HH:MM AM/PM'."
          }
        },
        "required": ["patientFirstName", "patientLastName", "patientEmail", "doctorName", "timeSlot"],
        "additionalProperties": false
      };

function validateAppointmentRequest(req, res, next) {
    const validate = ajv.compile(appointmentSchema);
    const valid = validate(req.body);

    if (!valid) {
        return res.status(400).json({ errors: validate.errors });
    }

    next();
}

module.exports = validateAppointmentRequest;
