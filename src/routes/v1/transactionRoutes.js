const express = require('express')
const multer = require('multer')
const transactionsController = require('../../controllers/transactionController')

const transactionsRoutes = express.Router()
const upload = multer()

transactionsRoutes.get('/transactions/:userID', transactionsController.show)
transactionsRoutes.delete('/transactions/:userID/:financialID',  transactionsController.deleteTransaction)
transactionsRoutes.post('/transactions/:userID', transactionsController.store)
transactionsRoutes.post('/transactions/import/:userID', upload.single('file'), transactionsController.importTransactions)

module.exports = transactionsRoutes