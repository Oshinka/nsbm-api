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
        }
      ],
      paths: {
        '/students': {
            post: {
                tags: ['Students'],
                summary: 'Use to request all students',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Student'
                            }
                        } 
                    }
                }
            }
        }
      },
      definitions: {
          'Student': {
              type: 'object',
              properties: {
                  'name': {
                      type: 'string'
                  },
                  'age': {
                      type: 'int'
                  },
                  'email': {
                      type: 'string'
                  },
                  'password': {
                      type: 'string'
                  }
            }
          }
      }
    },
    apis: ['./routes/*.js']
  };

  // Test