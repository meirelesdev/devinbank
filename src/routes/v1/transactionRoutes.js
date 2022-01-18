const express = require('express')
const routes = express.Router()

routes.get('/finance/:userID', (req, res)=>{
    console.log(req.params.userID)
    res.status(200).json({ message: "sucesso" })
})
routes.delete('/finance/:userID/:financialID', (req, res)=>{
    console.log(req.params.userID)
    console.log(req.params.financialID)
    res.status(200).json({ message: "sucesso" })
})
routes.post('/finance/:userID', (req, res)=>{
    console.log(req.body)
    res.status(200).json({ message: "sucesso" })
})
module.exports = routes
// {
//     "id": "",
//         "userId": "",
//             "financialData": [{
//                 "id": "",
//                 "price": "",
//                 "typesOfExpenses": "",
//                 "date": "",
//                 "name": ""
//             }]
// }