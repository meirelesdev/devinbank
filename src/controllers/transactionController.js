const xlsx = require('xlsx-populate')

const { getTransactionsByUserIDAndQuery, getAllTransactionsToRows, addTransactionsToUser, removeTransactionToUser, addOneTransactionToUser, getOrderedTransactionByMothAndYear } = require("../service/transactionService")
const { getUserById } = require('../service/userService')
const { columnsImport, typesXLS, monthsOfYear } = require('../utils/constants')
const { formatDate } = require('../utils/functions')

module.exports = {
    getTotalTransactions: async (req, res) => {
        // #swagger.tags = ['Transaction']
        // #swagger.description = 'Endpoint para buscar as transações de um usuário exibindo seus totais por ano/mês.'
        try {
            const { userID } = req.params
            if (!userID) throw new Error("Necessario informar um usuário para encontrar suas movimentações.")
            const query = req.query
            const { price, typesOfExpenses, date, name } = req.query
            await getUserById(userID)
            const transactions = await getTransactionsByUserIDAndQuery(userID, query)
            const transactionsOrdered = getOrderedTransactionByMothAndYear(transactions)            
            res.status(200).json({ message: "sucesso", expenses: transactionsOrdered })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    show: async (req, res) => {
        // #swagger.tags = ['Transaction']
        // #swagger.description = 'Endpoint para buscar as transações de um usuário.'
        try {
            const { userID } = req.params
            if (!userID) throw new Error("Necessario informar um usuário para encontrar suas movimentações.")
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
        // #swagger.description = 'Endpoint para deletar uma transação de um usuário.'
        try {
            const { userID, financialID } = req.params
            if (!userID || !financialID) throw new Error("Dados Insuficientes para excluir.")
            const user = await getUserById(userID)
            await removeTransactionToUser(userID, financialID)
            res.status(200).json({ message: "Transação deletada com sucesso" })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    store: async (req, res) => {
        /*
            #swagger.tags = ['Transaction']
            #swagger.description = 'Endpoint para adicionar uma transação a um usuário.'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados necessarios para cadastrar um transação.',
                required: true,
                schema: { $ref: "#/definitions/AddTransaction" }
            }
        */
        try {
            const { userID } = req.params
            const { price, typesOfExpenses, date, name } = req.body
            Object.keys(req.body).map(field => {
                if (!field || !req.body[field]) throw new Error(`O campo \'${field}\' é obrigatorio.`)
            })
            const columns = Object.keys(req.body)
            const existAllKeys = columns.every((column, index) => columnsImport[index] === column)
            if (!existAllKeys || (columns.length !== columnsImport.length)) throw new Error("Dados para importação invalidos.")
            const dateFormat = formatDate(date)
            const transactionData = {
                price,
                typesOfExpenses,
                date: dateFormat,
                name
            }
            const user = await getUserById(userID)
            await addOneTransactionToUser(transactionData, user)
            res.status(200).json({ message: "Transação adicionada com sucesso." })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    importTransactions: async (req, res) => {
        // #swagger.tags = ['Transaction']
        // #swagger.description = 'Endpoint para importar transações de uma arquivo XLSX e lançar para um usuário. 
        /* <h1>Modelo do Arquivo XLSX</h1>
        /* <span>OBS: Os nomes das colunas e ordem deve ser a mesma em seu arquivo.</span>
        <table id="modelo-xlsx" width="300">
            <thead>
            <tr>
                <th>price</th>
                <th>typesOfExpenses</th>
                <th>date</th>
                <th>name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>100</td>
                <td>Mercado</td>
                <td>01/01/2022</td>
                <td>Compras do mês</td>
            </tr>
            </tbody>
        </table>'
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['file'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Anexe uma planilha XLSX com os dados para importar',
        } */
        try {
            const { userID } = req.params
            if (!userID) throw new Error("Necessario um identificados de usuario para atribuir as transações.")
            if (!req.file) throw new Error("Arquivo para fazer a importação não encontrado")
            const mineType = req.file.mimetype
            const allowedType = typesXLS === mineType
            if (!allowedType) throw new Error("Tipo de Arquivo não permitido.")
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