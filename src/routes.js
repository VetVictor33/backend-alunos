const express = require('express');
const { greetings, getAllStudents, getStudentById, postNewStudent } = require('./controllers/students.controller')

const routes = express();

routes.get('/', greetings);
routes.get('/students/', getAllStudents);
routes.get('/students/:id', getStudentById);
routes.post('/newstudend', postNewStudent);


module.exports = routes;