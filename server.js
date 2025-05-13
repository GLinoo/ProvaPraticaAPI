const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express();
const PORT = 3000

function addLogs(nome){
    const data = new Date().toISOString()
    fs.appendFile('logs.txt', uuidv4() , data, nome)   
}

app.use(express())



app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ', PORT)
})










