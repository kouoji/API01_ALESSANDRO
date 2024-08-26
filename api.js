//1 requirewss
const exports = require('express')
const mysql2 = require('mysql2')
const cors = require('cors')

const mysql_config = require('./inc/mysql_config')
const functions = require('./inc/function')

//2 criação de duas constantes para a verificação da disponibilidade da api e tambem da versão da API

const API_AVAILABILITY=true
const  API_VERSION='1.0.0'

//2iniciar o server
const app = exports()
app.listen(3000,()=>{
    console.log('API executando')
})

//4 checar se o API esta disponivel
app.use((res,res,next)=>{
    if(API_AVAILABILITY){
        next();
    }else{
        res.json(functions.response('atenção','API esta em manutenção. Sinto muito',0,null))
    }
})

//5mysql_conection
const connection=mysql.createConection(mysql_config)

//6 cors
app.use(cors())

//7 rotas
//rota inicial que vai dizer que a API esta disponivel
app.get('./',()=>{
    res.json(functions.response('sucesso','API esta rodando',0,null))
}) 

//9 rota para pegar todas as tarefas
app.get('/tasks',(req,res)=>{
    connection.querry('SELECT * FROM tasks',(err,rows))
})

//8 midlaware para caso alguma rota não  sejas encontrada 
app.use((req,res)=>{
    res.json(functions.response('atenção','Rota não encontrada',0,null))
})