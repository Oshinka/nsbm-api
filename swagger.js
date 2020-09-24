// Extended: https://swagger.io/specification/

const { json } = require("express");

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: '1.0.0',
        title: 'NSBM API',
        description: 'Student LMS',
        contact: {
          name: 'Dumindu Oshinka',
          url: 'https://www.linkedin.com/in/dumindu-oshinka-680490138/',
          email: 'oshinka94@gmail.com'
        },
        servers: ["http://localhost:9000"]
      },
      tags: [
        {
          name: 'Students',
          description: 'API for students in the system'
        },
        {
          name: 'Lecturers',
          description: 'API for lecturers in the system'
        },
        {
          name: 'Subjects',
          description: 'List of subjects'
        }
      ],
    },
    apis: ['./routes/*.js']
  };

  module.exports = swaggerOptions;