const { createOrUpdateUser, hasUserWith, getAllUsers, getUserById, handleLogin } = require("../service/userService")

module.exports = {
    index: async (req, res) => {
        /**
         *
            #swagger.tags = ['User']
            #swagger.description = 'Endpoint que lista todos os usuários cadastrados.'
            #swagger.responses[200] = {},
                description: "Retorna um array de usuários ou vazio."} 
            #swagger.responses[500] = { description: "Server Failure." }
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
            #swagger.description = 'Endpoint para registrar um novo usuario.'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Parametros necessarios para criar um novo usuário.',
                required: true,
                schema: { $ref: "#/definitions/User" }
            }
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/User" },
                description: "Usuario registrado com sucesso." } 
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
                description: 'Parametros necessarios para criar um novo usuário.',
                required: true,
                schema: { $ref: "#/definitions/User" }
            }
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/User" },
                description: "Usuario registrado com sucesso." } 
        */
        try {
            const { name, email } = req.body
            if (!name || !email) throw new Error("Necessario informar todos os campos obrigatorios.")
            const newUser = { name, email }
            await hasUserWith(newUser)
            createOrUpdateUser(newUser)
            res.status(200).json({ message: "Sucesso", user: newUser })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    update: async (req, res) => {
        /**
         *
            #swagger.tags = ['User']
            #swagger.description = 'Endpoint para registrar um novo usuario.'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Parametros necessarios para criar um novo usuário.',
                required: true,
                schema: { $ref: "#/definitions/User" }
            }
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/User" },
                description: "Usuario registrado com sucesso." } 
        */
        try {
            const { userID } = req.params
            if (!userID) throw new Error("Id do usuário não informado")
            const data = req.body
            const user = await getUserById(userID)
            if (!user) throw new Error(`Usuário com o id ${userID}, não encontrado.`)
            createOrUpdateUser(data, userID)
            const userUpdated = await getUserById(userID)
            res.status(200).json({ message: "Sucesso", user: userUpdated })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    singin: async (req, res) => {
        /**
         *
            #swagger.tags = ['User']
            #swagger.description = 'Endpoint para registrar um novo usuario.'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Parametros necessarios para criar um novo usuário.',
                required: true,
                schema: { $ref: "#/definitions/User" }
            }
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/User" },
                description: "Usuario registrado com sucesso." } 
        */
        try {
            const user = await handleLogin(req.body)
            let msg = ''
            if (!user) {
                msg = 'Nome e/ou E-mail Invalidos.'
            } else {
                msg = 'Login Evetuado com sucesso.'
            }
            return res.status(200).json({ message: msg, user})
        } catch (e) {
            return res.status(404).json({ message: e.message })
        }
    }
}