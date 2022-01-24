const express = require('express')
const multer = require('multer')
const transactionsController = require('../../controllers/transactionController')

const transactionsRoutes = express.Router()
const upload = multer()

transactionsRoutes.post('/transactions/import/:userID', upload.single('file'), transactionsController.importTransactions)
transactionsRoutes.delete('/transactions/:userID/:financialID',  transactionsController.deleteTransaction)
transactionsRoutes.get('/finance/:userID', transactionsController.getTotalTransactions)
transactionsRoutes.get('/transactions/:userID', transactionsController.show)
transactionsRoutes.post('/transactions/:userID', transactionsController.store)

module.exports = transactionsRoutes