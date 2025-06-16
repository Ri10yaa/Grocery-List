const fs = require('fs');

const readfile = () => {
    const data = fs.readFileSync("list.txt",'utf8');
    return data;
}

const writefile = (data) => {
    fs.writeFileSync("list.txt",data);
    
}

const appendfile = (data) => {
    fs.appendFileSync("list.txt",data);
}

module.exports = {
    readfile,
    writefile,
    appendfile
}