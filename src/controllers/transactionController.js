const xlsx = require('xlsx-populate')

const { getTransactionsByUserIDAndQuery, getAllTransactions, addTransactionsToUser } = require("../service/transactionService")
const { getUserById } = require('../service/userService')

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
            res.status(200).json({ message: "sucesso" })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    store: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            res.status(200).json({ message: "sucesso" })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    importTransactions: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            const { userID } = req.params
            if(!userID) throw new Error("Necessario um identificados de usuario para atribuir as transações.")
            const { buffer } = req.file
            const dataXLSX = await xlsx.fromDataAsync(buffer, { type: 'buffer' })
            const rows = dataXLSX.sheet(0).usedRange().value()
            const transactions = await getAllTransactions(rows, xlsx)
            const user = await getUserById(userID)
            const data = await addTransactionsToUser(transactions, user)
            res.status(200).json({ message: "sucesso", data })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    }
}