const { getData } = require('../utils/functions')

const getUserById = async (id) => {
    const users = getData('users')
    return users.find((user) => user.id === Number(id))
}
module.exports = {
    getUserById
}