module.exports = {
    show: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            res.status(200).json({ message: "sucesso"  })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    deleteTransaction: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            res.status(200).json({ message: "Sucesso" })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    store: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            res.status(200).json({ message: "Sucesso" })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    },
    importTransactions: async (req, res) => {
        // #swagger.tags = ['Transaction']
        try {
            res.status(200).json({ message: "Sucesso" })
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    }
}