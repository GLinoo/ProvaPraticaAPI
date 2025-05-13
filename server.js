const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { log } = require('console');
const app = express();
const PORT = 3000

function addLogs(id , nome){
    const date = new Date().toISOString()
    const mensagem = `${id} ${date} ${JSON.stringify(nome)}\n`
    fs.appendFile('logs.txt', mensagem, (err) => {
        if(err) {
            console.log('Erro ao salvar log', err)
        }
    })
}

app.use(express.json())

app.post('/logs', (req,res) =>{
    const nome = req.body
    if(!nome){
      return res.status(400).json({message: 'O campo "nome" deve ser preenchido!'})  
    }
    const idCriado = uuidv4()
    addLogs(idCriado,nome)
    return res.status(200).json({message: 'Log adicionada com sucesso', idCriado})

})

app.get('/logs/:id', (req,res) => {
    const id = req.params.id
    fs.readFile('logs.txt', 'utf8', (err, data) =>{
        if(err){
            return res.status(500).json({message: "Erro ao ler arquivo de logs", err})
        }
         const linha = data
         .split('\n')
         .find(l => l.startsWith(id + ' '))

         if(!linha){
            return res.status(404).json({message: "Erro ao ler logs"})
         }
         const [logID, dataLog, ...nome] = linha.split(' ')
         res.status(200).json({log: logID, data: dataLog, nome: nome})
    } 
    )
})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ', PORT)
})