const fsi = require('./file_ops.js');

const fetchID = () =>{
    const data = fsi.readfile();
    return data.split('\n').shift();
}

const incrementID = () => {
    const data = fsi.readfile();
    const id = parseInt(data.split('\n').shift());
    
    const newData = data.replace(data.split('\n').shift(),id+1);
    
    
    fsi.writefile(newData);

}

module.exports = {
    fetchID,
    incrementID
}