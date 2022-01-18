const fileSystem = require('fs');

const getData = (fileName) => {
    return JSON.parse(fileSystem.readFileSync(`./src/database/${fileName}.json`, 'utf8'));
}
const setData = (fileName, data) => {
    fileSystem.writeFileSync(`./src/database/${fileName}.json`, JSON.stringify(data));
}
const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}
const getPosition = (base, dataToFind ) => {
    const position = base.findIndex((item) => item.id === dataToFind)
    return (position > -1 ) ? position : null;
}
module.exports = {
    getData,
    setData,
    isEmpty,
    getPosition
}