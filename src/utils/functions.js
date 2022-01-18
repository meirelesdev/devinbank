const fs = require('fs');
module.exports = {
    getData: async (fileName) => {
        return JSON.parse(await fs.readFileSync(`./src/database/${fileName}.json`), 'utf8')
    },
    setData: (fileName, data) => {
        fs.writeFileSync(`./src/database/${fileName}.json`, JSON.stringify(data));
    },
    isEmpty: (obj) => {
        return Object.keys(obj).length === 0
    },
    getPosition: (base, dataToFind ) => {
        const position = base.findIndex((item) => item.id === dataToFind)
        return (position > -1 ) ? position : null;
    }
}