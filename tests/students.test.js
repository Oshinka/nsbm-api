const request = require('supertest');
const app = require('../app');
const Student = require('../database/models/students');

const student = {
    firstName: 'Jack',
    lastName: 'Frozen',
    gender: 'Male',
    dateOfBirth: '"1997-09-28"',
    email: 'jack@gmail.com',
    contact: {
        mobile: '0112345678',
        fixed: '0712345678'
    },
    password: 'jack123',
    avatar: 'https://media.gettyimages.com/photos/using-technology-at-home-picture-id1209946540?s=2048x2048'
}

beforeEach(async () => {
    await Student.deleteMany({});
    // await Student(student).save();
});

afterEach(() => {
    // what should run after every testrun
});

test('should create a new student', async () => {
    await request(app).post('/students')
        .send({
            firstName: 'Alex',
            lastName: 'Samuel',
            gender: 'male',
            dateOfBirth: '"1996-01-25"',
            email: 'alex@gmail.com',
            contact: {
                mobile: '0124568973',
                fixed: '0705248619'
            },
            password: 'alex123',
            avatar: 'https://media.gettyimages.com/photos/an-african-american-university-student-studying-in-the-library-stock-picture-id1182479258?s=2048x2048'
        })
        .expect(201)
});

test('should login student', async () => {
    await Student(student).save();

    await request(app).post('/students/login')
        .send({
            email: student.email,
            password: student.password,
        })
        .expect(200)
});

test('should get all students', async () => {
    await request(app).get('/students')
        .expect(200)
});

test('should get authorized student', async () => {
    const createdStudent = new Student(student);
    const token = await createdStudent.generateAuthToken();

    await request(app).get('/students/me')
                .set('Authorization', token)
                .expect(200)
});

test('should logout student', async () => {
    await request(app).get('/students/logout')
    expect(200)
});

test('should update a student', async () => {
    const createdStudent = new Student(student);
    await createdStudent.save();
    
    await request(app).patch(`/students/${createdStudent._id}`)
        .send({
            lastName: 'Hide'
        })
        .expect(200)
})

test('should delete a student', async () => {
    const createdStudent = new Student(student);
    await createdStudent.save();

    await request(app).delete(`/students/${createdStudent._id}`)
        .expect(200)
})

