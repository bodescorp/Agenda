const express = require('express');

const AppointmentsControler = require('./controllers/AppointmentsControler');

const routes = express.Router();


//lista todos os “appointments”
routes.get('/Appointments', AppointmentsControler.list);
//adiciona um novo “appointment”
routes.post('/Appointments', AppointmentsControler.create);
//atualiza o state de um appointment
routes.put('/Appointments/state', AppointmentsControler.update);
//deleta um “appointment” com id específico da lista
routes.delete('/Appointments/:id', AppointmentsControler.delete);
//listar appointment expecifico
routes.get('/Appointmentselect/:id', AppointmentsControler.select);


module.exports = routes;
