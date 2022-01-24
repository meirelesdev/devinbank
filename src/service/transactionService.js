const { columnsImport, monthsOfYear } = require("../utils/constants")
const { getData, getPosition, setData, formatDateFromXLSX } = require("../utils/functions")

const getAllTransactions = async () => {
    return await getData('transactions')
}
const getTransactionsByUserIDAndQuery = async (userID, query) => {
    const transactionsData = await getData('transactions')
    const transactionsOfUser = transactionsData.find(transaction => transaction.userID === Number(userID))
    if (!transactionsOfUser) return []
    const transactionsFilteredByQuery = transactionsOfUser.finacialData.filter(item => {
        const filteredByQuery = Object.keys(query).filter(key => {
            return query[key] && item[key] && String(item[key]).toLocaleLowerCase().includes(String(query[key]).toLocaleLowerCase())
        })
        return filteredByQuery.length > 0
    })
    return transactionsFilteredByQuery.length > 0 ? transactionsFilteredByQuery : transactionsOfUser.finacialData
}
const getAllTransactionsToRows = async (rows, xlsx) => {
    const columns = rows.shift()
    const existAllKeys = columns.every((column, index) => columnsImport[index] === column)
    if (!existAllKeys || (rows[0].length !== columnsImport.length)) throw new Error("Dados para importação invalidos.")
    const transactionsData = rows.filter(row => {
        return row[0] && row[1] && row[2] && row[3]
    })
    const rowsWithDateFormated = transactionsData.map(row => {
        return row.map((item, index) => {
            if (index === 2) return xlsx.numberToDate(item)
            return item
        })
    })
    return rowsWithDateFormated.map(transaction => {
        return {
            price: transaction[0],
            typesOfExpenses: transaction[1],
            date: formatDateFromXLSX(transaction[2]),
            name: transaction[3]
        }
    })
}
const removeTransactionToUser = async (userID, transactionID) => {
    const allTransactions = await getAllTransactions()
    const positionUserTransactions = getPosition(allTransactions, Number(userID))
    if (positionUserTransactions === null) throw new Error("Usuario ainda não tem nenhum lançamento.")
    const positionTransactionToDelete = allTransactions[positionUserTransactions].finacialData.findIndex(transaction => transaction.id === Number(transactionID))
    if (positionTransactionToDelete === -1) throw new Error("Transação não encontrada.")
    allTransactions[positionUserTransactions].finacialData.splice(positionTransactionToDelete, 1)
    setData('transactions', allTransactions)
}
const addTransactionsToUser = async (transactions, user) => {
    const storeTransactions = await getData('transactions')
    let transactionsOfUser = null
    let position = null
    if (storeTransactions.length > 0) {
        transactionsOfUser = storeTransactions.find(tran => tran.userID === user.id)
        position = getPosition(storeTransactions, user.id)
    }
    if (transactionsOfUser) {
        transactionsOfUser.finacialData = [...transactionsOfUser.finacialData, ...transactions.map((transaction, index) => {
            return { id: transactionsOfUser.finacialData.length + index + 1, ...transaction }
        })]
    } else {
        transactionsOfUser = {
            id: storeTransactions.length + 1,
            userID: user.id,
            finacialData: transactions.map((transaction, index) => {
                return {
                    id: index + 1,
                    ...transaction
                }
            })
        }
    }
    if (position !== null) {
        storeTransactions[position] = transactionsOfUser
    } else {
        storeTransactions.push(transactionsOfUser)
    }
    setData('transactions', storeTransactions)
    return transactionsOfUser
}
const addOneTransactionToUser = async (data, user) => {
    const storeTransactions = await getData('transactions')
    let transactionsOfUser = null
    let position = null
    if (storeTransactions.length > 0) {
        transactionsOfUser = storeTransactions.find(tran => tran.userID === user.id)
        position = getPosition(storeTransactions, user.id)
    }
    if (transactionsOfUser) {
        transactionsOfUser.finacialData = [...transactionsOfUser.finacialData, { id: transactionsOfUser.finacialData.length + 1, ...data }]
    } else {
        transactionsOfUser = {
            id: storeTransactions.length + 1,
            userID: user.id,
            finacialData: [{ id: 1, ...data }]
        }
    }
    if (position !== null) {
        storeTransactions[position] = transactionsOfUser
    } else {
        storeTransactions.push(transactionsOfUser)
    }
    await setData('transactions', storeTransactions)
    return transactionsOfUser
}
const getOrderedTransactionByMothAndYear = (transactions) => {
    const years = transactions.map(item => {
        const date = new Date(item.date)
        const ano = date.getFullYear()
        const mes = date.getMonth()
        return {
            [ano]: {
                [monthsOfYear[mes]]: item.price
            }
        }
    })
    let yearsWithData = {}
    years.forEach((item, index) => {
        const [year] = Object.keys(item)
        const [month] = Object.keys(item[year])
        if (!yearsWithData[year]) {
            yearsWithData[year] = {
                [month]: Number(item[year][month])
            }
        } else if(yearsWithData[year]) {
            const value = yearsWithData[year][month] || 0
            yearsWithData[year] = {...yearsWithData[year], [month]: Number(item[year][month]) + Number(value) }
        }
    })
    return yearsWithData
}

module.exports = {
    getAllTransactions,
    getTransactionsByUserIDAndQuery,
    getAllTransactionsToRows,
    removeTransactionToUser,
    addTransactionsToUser,
    addOneTransactionToUser,
    getOrderedTransactionByMothAndYear
}