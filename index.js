const express = require('express')
const cors = require('cors');

const PORT = 9001;

const app = express();

app.use(cors())

app.get('/', (req, res)=>{
    res.json('Ola, bem vindo a minha API!')
})

app.listen(PORT, ()=>{
    console.log(`rodando na porta ${PORT}`)
})