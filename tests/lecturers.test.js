const request = require('supertest');
const app = require('../app');
const Lecturer = require('../database/models/lecturers');

const lecturer = {
    name: 'Mosh',
    age: 42,
    email: 'mosh@gmail.com',
    password: 'mosh123',
    position: 'lecturer',
    avatar: 'https://media.gettyimages.com/photos/using-technology-at-home-picture-id1209946540?s=2048x2048'
}

beforeEach(async () => {
    await Lecturer.deleteMany({});
});

test('should create a new lecturer', async () => {
    await request(app).post('/lecturers')
        .send(lecturer)
        .expect(201)
});
