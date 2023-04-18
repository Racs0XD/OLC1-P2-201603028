'use strict'
const express = require('express');
const app = express();
const morgan = require('morgan');

const bodParser = require('body-parser')
let cors = require('cors')


const parser = require('./analizador');
app.set('port', process.env.PORT || 5000);

//middlewares
app.use(morgan('dev'));
app.use(bodParser.json({limit:'50mb', extended:true}));
app.use(bodParser.urlencoded({limit:'50mb', extended:true}));
app.use(cors());


app.get('/',(req,res)=>{
    var respuesta={
        message:"Todo bien"
    }
    res.send(respuesta)
})

const analizar = require('./endpoints/analizador')(parser, app)



//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Servidor en puerto ${app.get('port')}`);
});