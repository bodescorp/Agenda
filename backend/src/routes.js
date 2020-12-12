const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')

const AppointmentsControler = require('./controllers/AppointmentsControler');

const routes = express.Router();


//lista todos os “appointments”
routes.get('/Appointments', AppointmentsControler.list);

//adiciona um novo “appointment”
routes.post('/Appointments', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().regex(/appointment/),
        address: Joi.string().required(),
        patientName: Joi.string().required(),
        dateTime: Joi.string().required(),
        state: Joi.string().required()
    })
}), AppointmentsControler.create);

//atualiza o state de um appointment
routes.put('/Appointments/state', celebrate({
    [Segments.BODY]: Joi.object().keys({
        state: Joi.string().required()
    }),
    [Segments.HEADERS]: Joi.object({
        id: Joi.string().required().regex(/appointment/),
    }).unknown(),

}), AppointmentsControler.update);

//deleta um “appointment” com id específico da lista
routes.delete('/Appointments/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().regex(/appointment/)
    })
}), AppointmentsControler.delete);

//listar appointment expecifico
routes.get('/Appointmentselect/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().regex(/appointment/)
    })
}), AppointmentsControler.select);


module.exports = routes;
