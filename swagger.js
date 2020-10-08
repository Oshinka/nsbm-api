const Lecturers = require("./database/models/lecturers");

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
                schema: {
                  $ref: '#/definitions/Student'
                }
              },
              404: {
                description: 'Not found'
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
        },
        '/lecturers': {
          post: {
            tags: ['Lecturers'],
            summary: 'Create new lecturer',
            description: 'Add one lecturer',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Lecturer object',
                required: true,
                schema: {
                  $ref: '#/definitions/Lecturer'
                }
              }
            ],
            responses: {
              201: {
                description: 'New lecturer has created'
              },
              405: {
                description: 'Invalid input'
              }
            }
          },
          get: {
            tags: ['Lecturers'],
            summary: 'Get lecturers',
            description: 'Get all lecturers',
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
        '/lecturers/{id}': {
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Lecturer Id',
              required: true,
              schema: {
                $ref: '#/definitions/id'
              }
            }
          ],
          get: {
            tags: ['Lecturers'],
            summary: 'Get lecturer',
            description: 'Get one lecturer',
            produces: 'application/json',
            responses: {
              200: {
                description: 'Success!',
                schema: {
                  $ref: '#/definitions/Lecturer'
                }
              },
              404: {
                description: 'Not found'
              }
            }
          },
          patch: {
            tags: ['Lecturers'],
            summary: 'Update lecturer',
            description: 'Edit lecturer',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Lecturer object',
                required: true,
                schema: {
                  $ref: '#/definitions/Lecturer'
                }
              }
            ],
            responses: {
              201: {
                description: 'Lecturer has updated successfully'
              },
              404: {
                description: 'Not found'
              }
            }
          },
          delete: {
            tags: ['Lecturers'],
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
        },
        '/subjects': {
          post : {
            tags: ['Subjects'],
            summary: 'Create new subject',
            description: 'Add new subject',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Subject object',
                required: true,
                schema: {
                  $ref: '#/definitions/Subject'
                }
              }
            ],
            responses: {
              201: {
                description: 'New subject has created'
              },
              405: {
                description: 'Invalid input'
              }
            }
          },
          get: {
            tags: ['Subjects'],
            summary: 'Get Subjects',
            description: 'Get all subjects',
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
        '/subjects/{id}': {
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Subject Id',
              required: true,
              schema: {
                $ref: '#/definitions/id'
              }
            }
          ],
          get: {
            tags: ['Subjects'],
            summary: 'Get subject',
            description: 'Get one subject',
            produces: 'application/json',
            responses: {
              200: {
                description: 'Success!',
                schema: {
                  $ref: '#/definitions/Subject'
                }
              },
              404: {
                description: 'Not found'
              }
            }
          },
          patch: {
            tags: ['Subjects'],
            summary: 'Update subject',
            description: 'Edit subject',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
              {
                in: 'body',
                name: 'body',
                description: 'Subject object',
                required: true,
                schema: {
                  $ref: '#/definitions/Subject'
                }
              }
            ],
            responses: {
              201: {
                description: 'Subject has updated successfully'
              },
              404: {
                description: 'Not found'
              }
            }
          },
          delete: {
            tags: ['Subjects'],
            summary: 'Delete subject',
            description: 'Delete subject by Id',
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
        },
        Lecturer: {
          type: 'object',
          properties: {
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
        },
        Subject: {
          type: 'object',
          properties: {
            subjectCode: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            semester: {
              type: 'integer'
            },
            isCompulsory: {
              type: 'boolean'
            },
            credits: {
              type: 'object',
              properties: {
                lecture: {
                  type: 'integer'
                },
                practical: {
                  type: 'integer'
                }
              }
            }
          }
        }
      }
    },
    apis: ['./routes/*.js']
  };

  module.exports = swaggerOptions;