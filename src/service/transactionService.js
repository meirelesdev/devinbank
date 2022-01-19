const { columnsImport } = require("../utils/constants")
const { getData, getPosition, setData } = require("../utils/functions")

module.exports = {
    getAllTransactions: async () => {
        return await getData('transactions')
    },
    getTransactionsByUserIDAndQuery: async (userID, query) => {
        const transactionsData = await getData('transactions')
        const transactionsOfUser = transactionsData.find(transaction => transaction.userID === Number(userID))
        if(!transactionsOfUser) return []
        const transactionsFilteredByQuery = transactionsOfUser.finacialData.filter(item => {
            const filteredByQuery = Object.keys(query).filter(key => {
                return query[key] && item[key] && String(item[key]).toLocaleLowerCase().includes(String(query[key]).toLocaleLowerCase())
            })
            return filteredByQuery.length > 0
        })
        return transactionsFilteredByQuery.length > 0 ? transactionsFilteredByQuery : transactionsOfUser.finacialData
    },
    getAllTransactions: async (rows, xlsx) => {
        const columns = rows.shift()
        const existAllKeys = columns.every((column, index) => columnsImport[index] === column )

        if (!existAllKeys || (rows[0].length !== columnsImport.length)) throw new Error("Dados para importação invalidos.")
        const transactionsData = rows.filter(row =>{
            return row[0] && row[1] &&row[2] && row[3]
        })
        const rowsWithDateFormated = transactionsData.map(row=>{
            return row.map((item, index)=>{
                if(index === 2) return xlsx.numberToDate(item)
                return item
            })
        })
        return rowsWithDateFormated.map(transaction => {
            return {
                price: transaction[0],
                typeOfExpenses: transaction[1],
                date: transaction[2],
                name: transaction[3]
            }
        })
    },
    addTransactionsToUser: async (transactions, user) => {
        const storeTransactions = await getData('transactions')
        let transactionsOfUser = null
        let position = null
        if(storeTransactions.length > 0){
            transactionsOfUser = storeTransactions.find(tran => tran.userID === user.id)
            position = getPosition(storeTransactions, user.id)
        }
        if(transactionsOfUser) {
            transactionsOfUser.finacialData = [ ...transactionsOfUser.finacialData, ...transactions.map((transaction, index) => {
                return { id: transactionsOfUser.finacialData.length + index + 1, ...transaction }
            })]
        } else {
            console.log("awui")
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
        if(position !== null){
            storeTransactions[position] = transactionsOfUser
        } else {
            storeTransactions.push(transactionsOfUser)
        }
        setData('transactions', storeTransactions)
        return transactionsOfUser
    }
}