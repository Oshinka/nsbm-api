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
      schemes: ['http', 'https'],
      paths:{
        '/students': {
          post: {
            tags: ['Students'],
            summary: 'Create new student',
            description: 'Add one student',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Student object',
                required: true,
                schema: {
                  $ref: '#/definitions/Student'
                }
              }
            ],
            responses: {
              201: {
                description: 'New student has created'
              },
              405: {
                description: 'Invalid input'
              }
            }
          },
          get: {
            tags: ['Students'],
            summary: 'Get students',
            description: 'Get all students',
            produces: 'application/json',
            responses: {
              200: {
                description: 'Success!'
              },
              404: {
                description: 'Not found'
              }
            }
          }
        },
        '/students/{id}': {
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Student Id',
              required: true,
              schema: {
                $ref: '#/definitions/id'
              }
            }
          ],
          get: {
            tags: ['Students'],
            summary: 'Get student',
            description: 'Get one student',
            produces: 'application/json',
            responses: {
              200: {
                description: 'Success!',
                "schema": {
                  "$ref": "#/definitions/Student"
              }
              }
            }
          },
          patch: {
            tags: ['Students'],
            summary: 'Update student',
            description: 'Edit student',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Student object',
                required: true,
                schema: {
                  $ref: '#/definitions/Student'
                }
              }
            ],
            responses: {
              201: {
                description: 'Student has updated successfully'
              },
              404: {
                description: 'Not found'
              }
            }
          },
          delete: {
            tags: ['Students'],
            summary: 'Delete student',
            description: 'Delete one student',
            responses: {
              200: {
                description: 'OK'
              },
              404: {
                description: 'Not found'
              }
            }
          }
        }
      },
      definitions: {
        id: {
          properties: {
            uuid: {
              type: 'string'
            }
          }
        },
        Student: {
          type: 'object',
          properties : {
            name: {
              type: 'string'
            },
            age: {
              type: 'integer'
            },
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          }
        }
      }
    },
    apis: ['./routes/*.js']
  };

  module.exports = swaggerOptions;