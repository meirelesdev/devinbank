
const doc = {
    info: {
        version: "1.0.0",
        title: 'DevInBank | Conta-365',
        description: 'Bem vindo, aqui você encontra todos os endpoints da API Conta365.',
    },
    host: "fast-mesa-03880.herokuapp.com/",
    basePath: "/",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Neste endpoint você tem acesso as informações de usuarios."
        },
        {
            "name": "Transaction",
            "description": "Neste endpoint você tem acesso as informações das transações de usuarios."
        }
    ],
    definitions: {
        User: {
            id: 1,
            name: "Jhon Doe",
            email: "e-mail@email.com.br"
        },
        Transaction: {
            id: 1,
            userId: 2,
            financialData: [{
                id: 1,
                price: 21.90,
                typesOfExpenses: "Gasolina",
                date: "2022-01-01",
                name: "Descriçõ do gasto com a gasolina"
            }]
        },
        AddUser: {
            $name: "Jhon Doe",
            $email: "jhondoe@doe.com.br"
        },
        AddTransaction: {
                $price: 21.90,
                $typeOfExpenses: "Gasolina",
                $date: "2021-12-31T03:00:00.000Z",
                $name: "Descrição do gasto com a gasolina"
        }
    }
}
module.exports = doc