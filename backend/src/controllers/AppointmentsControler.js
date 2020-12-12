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
                const result = snapshot.val();

                if (!result) {
                    return response.status(400).json({ error: 'Appointment não existe' });
                }
                return response.json(result);
            });
    },

    async create(request, response) {
        const { id, address, patientName, dateTime, state } = request.body;
        const dados = {
            address,
            patientName,
            dateTime,
            state
        }
        //verifica se o appointment ja existe
        await connection.ref('appointments/' + id)
            .once('value')
            .then((snapshot) => {
                const respos = snapshot.val();
                if (!respos) {
                    //Criação de um Appointments   
                    connection.ref('appointments/' + id).set(dados);
                    return response.json("cadastrado");
                } else {
                    return response.status(400).json('appointment já cadastrado');
                }
            });

    },

    async update(request, response) {
        const id = request.headers.id;
        const { state } = request.body;

        //verifica se o appointment existe
        const result = await connection.ref('appointments/' + id)
            .once('value')
            .then((snapshot) => {
                const result = snapshot.val();
                if (!result) {
                    return response.status(400).json({ error: 'Appointment não existe' });
                }  //verificar se o state existe
                connection.ref('options/').once('value')
                    .then((snapshot) => {
                        const options = snapshot.val();

                        for (let index = 0; index < options.length; index++) {
                            if (state == options[index]) {
                                // atualizar o State
                                connection.ref('appointments/' + id).update({ state });
                                return response.json('State alterado com Sucesso');
                            }
                        }
                        return response.status(400).json({ error: 'State não alterado, state n existe' });
                    });

            });

    },

    async delete(request, response) {
        const { id } = request.params;
        //deletar um Appointments
        await connection.ref('appointments/' + id).remove()
        return response.status(204).send();
    }
};

