const fs = require('fs');
module.exports = {
    getData: async (fileName) => {
        return JSON.parse(await fs.readFileSync(`./src/database/${fileName}.json`), 'utf8')
    },
    setData: async (fileName, data) => {
        await fs.writeFileSync(`./src/database/${fileName}.json`, JSON.stringify(data));
    },
    getPosition: (base, dataToFind ) => {
        const position = base.findIndex((item) => item.userID === dataToFind)
        return (position > -1 ) ? position : null;
    }
}