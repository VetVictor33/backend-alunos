const express = require('express');
const { greetings, getAllStudents, getStudentById } = require('./controllers/students.controller')

const routes = express();

routes.get('/', greetings);
routes.get('/students/', getAllStudents);
routes.get('/students/:id', getStudentById)


module.exports = routes;