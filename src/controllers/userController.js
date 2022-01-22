const { createOrUpdateUser, hasUserWith, getAllUsers, getUserById } = require("../service/userService")

module.exports = {
    index: async (req, res) => {
        /**
         *
            #swagger.tags = ['User']
            #swagger.description = 'Endpoint que lista todos os usuários cadastrados.'
        */
        try {
            const users = await getAllUsers()
            res.status(200).json({ message: "sucesso", users })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    },
    show: async (req, res) => {
        /**
         *
            #swagger.tags = ['User']
            #swagger.description = 'Endpoint que mostra os dados de um usuário cadastrado.'
        */
        try {
            const { userID } = req.params
            if (!userID) throw new Error("Id do usuário não informado")
            const user = await getUserById(userID)
            if (!user) throw new Error(`Usuário com o id ${userID}, não encontrado.`)
            res.status(200).json({ message: "sucesso", user })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    singup: async (req, res) => {
        /**
         *
            #swagger.tags = ['User']
            #swagger.description = 'Endpoint para registrar um novo usuario.'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados necessarios para cadastrar um usuário.',
                required: true,
                schema: { $ref: "#/definitions/AddUser" }
            }
        */
        try {
            const { name, email } = req.body
            if (!name ) throw new Error("O campo name é obrigatório.")
            if (!email ) throw new Error("O campo email é obrigatório.")
            const newUser = { name, email }
            const user = await hasUserWith(newUser, true)
            await createOrUpdateUser(newUser)
            res.status(200).json({ message: "Sucesso", user: user })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    update: async (req, res) => {
        /**
         *
            #swagger.tags = ['User']
            #swagger.description = 'Endpoint para atualizar um usuario já cadastrado.'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados necessarios para atualizar um usuário. você pode enviar apenas um ou mais campos',
                required: true,
                schema: { $ref: "#/definitions/AddUser" }
            }
        */
        try {
            const { userID } = req.params
            if (!userID) throw new Error("Id do usuário não informado")
            const {name, email} = req.body
            let data = {}
            if(name) data[name] = name
            if(email) data[email] = email
            const user = await getUserById(userID)
            if (!user) throw new Error(`Usuário com o id ${userID}, não encontrado.`)
            await createOrUpdateUser(data, userID)
            const userUpdated = await getUserById(userID)
            res.status(200).json({ message: "Sucesso", user: userUpdated })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    }
}