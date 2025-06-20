

const isString = (str) =>{
    return /^[a-zA-Z]+$/.test(str);
}

const isNumber = (str) =>{
    return /^[0-9]+$/.test(str);
}

module.exports = {
    isString,
    isNumber
}