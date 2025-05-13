const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


function addLogs(nome){
    const data = new Date().toISOString()
    fs.appendFile('logs.txt', uuidv4() , data, nome)   
}










