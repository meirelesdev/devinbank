const fs = require('fs');
const dateFns = require('date-fns')

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
    },
    formatDateFromXLSX: (date) => {
        return dateFns.format(date, 'yyyy-M-dd', {timeZone: 'America/Sao_Paulo'})
    },
    formatDate: (date) => {
        const dateArray = date.replace('\/', '-').replace('\/', '-').split('-')
        return dateFns.format(dateFns.parseISO(dateArray.reverse().join('-')), 'yyyy-M-dd', {timeZone: 'America/Sao_Paulo'})
    }
}