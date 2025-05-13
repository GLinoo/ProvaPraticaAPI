const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express();
const PORT = 3000

function addLogs(id , nome){
    const data = new Date().toISOString()
    fs.appendFile('logs.txt', id , data, nome)   
}

app.use(express())

app.post('/logs', (req,res) =>{
    const {nome} = req.body
    if(!nome){
      res.status(400).json({message: 'O campo "nome" deve ser preenchido!'})  
    }
    const id = uuidv4()
    addLogs(id,nome)
    return res.status(200).json({message: 'Log adicionada com sucesso', id})

})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ', PORT)
})










