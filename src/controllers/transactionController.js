const xlsx = require('xlsx-populate')
const { getTransactionsByUserIDAndQuery, getAllTransactionsToRows, addTransactionsToUser, removeTransactionToUser, addOneTransactionToUser } = require("../service/transactionService")
const { getUserById } = require('../service/userService')
const { columnsImport } = require('../utils/constants')

module.exports = {
    show: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            const { userID } = req.params
            if(!userID) throw new Error("Necessario um identificados de usuario encontrar suas movimentações.")
            const query = req.query
            await getUserById(userID)
            const transactions = await getTransactionsByUserIDAndQuery(userID, query)
            res.status(200).json({ message: "sucesso", transactions })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    deleteTransaction: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            const { userID, financialID } = req.params
            if(!userID || !financialID ) throw new Error("Dados Insuficientes para excluir.")
            const user = await getUserById(userID)
            await removeTransactionToUser(userID, financialID)
            res.status(200).json({ message: "Transação deletada com sucesso" })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    store: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            const { userID } = req.params
            const { price, typeOfExpenses, date, name } = req.body
            Object.keys(req.body).map(field => {
                if(!field || !req.body[field]) throw new Error(`O campo \'${field}\' é obrigatorio.`)
            })
            const columns = Object.keys(req.body)
            const existAllKeys = columns.every((column, index) => columnsImport[index] === column )
            if (!existAllKeys || (columns.length !== columnsImport.length)) throw new Error("Dados para importação invalidos.")
            const transactionData = { 
                price,
                typeOfExpenses,
                date,
                name
            }
            const user = await getUserById(userID)
            await addOneTransactionToUser(transactionData, user)
            res.status(200).json({ message: "Transação adicionada com sucesso."})
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    importTransactions: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            const { userID } = req.params
            if(!userID) throw new Error("Necessario um identificados de usuario para atribuir as transações.")
            if(!req.file) throw new Error("Arquivo para fazer a importação não encontrado")
            const { buffer } = req.file
            const dataXLSX = await xlsx.fromDataAsync(buffer, { type: 'buffer' })
            const rows = dataXLSX.sheet(0).usedRange().value()
            const transactions = await getAllTransactionsToRows(rows, xlsx)
            const user = await getUserById(userID)
            const data = await addTransactionsToUser(transactions, user)
            res.status(200).json({ message: "sucesso", data })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    }
}