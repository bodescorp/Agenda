const connection = require('../database/connectionFire');


module.exports = {
    async list(request, response) {
        //listagem de todos os Appointments
        const listresult = await connection.ref('appointments/')
            .once('value')
            .then((snapshot) => {
                return snapshot.val();

            });

        return response.json(listresult);
    },

    async select(request, response) {
        const { id } = request.params;
        //exibir Appointments expecifico
        const result = await connection.ref('appointments/' + id)
            .once('value')
            .then((snapshot) => {
                return snapshot.val();

            });

        return response.json(result);

    },

    async create(request, response) {
        const { id, address, patientName, dateTime, state } = request.body;
        const dados = {
            address,
            patientName,
            dateTime,
            state
        }
        //Criação de um Appointments   
        await connection.ref('appointments/' + id).set(dados)

        return response.json("cadrasto");

    },

    async update(request, response) {
        const id = request.headers.id;
        const { state } = request.body
        // atualizar o State
        await connection.ref('appointments/' + id).update({ state })


        return response.json('State alterado com Sucesso');
    },

    async delete(request, response) {
        const { id } = request.params;
        //deletar um Appointments
        await connection.ref('appointments/' + id).remove()
        return response.status(204).send();
    }
};

