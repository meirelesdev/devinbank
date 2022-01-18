const { getData, setData } = require('../utils/functions')

module.exports = {
    getAllUsers: async ()=>{
        return await getData('users')
    },
    getUserById: async (id) => {
        const users = await getData('users')
        return users.find((user) => user.id === Number(id))
    },
    createOrUpdateUser: async (userData, id = null) => {
        const users = await getData('users')
        let newDataUsers = []
        if (Number(id)) {
            newDataUsers = users.map(user => {
                return user.id === Number(id) ? { ...user, ...userData } : user
            })
        } else {
            newDataUsers = [...users, { id: users.length + 1, ...userData }]
        }
        await setData('users', newDataUsers)
    },
    hasUserWith: async (user) => {
        const users = await getData('users')
        const userFond = users.find(u => u.name.toLowerCase() === user.name.toLowerCase() && u.email.toLowerCase() === user.email.toLowerCase())
        if(userFond) throw new Error("Usuário já cadastrado.")
    },
    handleLogin: async (user) => {
        const users = await getData('users')
        return users.find(u => u.name.toLowerCase() === user.name.toLowerCase() && u.email.toLowerCase() === user.email.toLowerCase())
    }
}