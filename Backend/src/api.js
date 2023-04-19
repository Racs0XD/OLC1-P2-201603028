'use strict'
const express = require('express');
const bodParser = require('body-parser')
const cors = require('cors');
const parser = require('./gramatica/g');
const app = express();
const morgan = require('morgan');

//middlewares
app.set('port', process.env.PORT || 5000);
app.use(morgan('dev'));
app.use(bodParser.json({limit:'50mb', extended:true}));
app.use(bodParser.urlencoded({limit:'50mb', extended:true}));
app.use(cors());



const analizar = require('./endpoints/analizador')(parser, app)


app.get('/',(req,res)=>{  
    var respuesta={
        message:"Todo bien"
    }
    res.send(respuesta)
})

//starting the server
app.listen(app.get('port'), ()=>{    
    console.log(`Servidor en puerto ${app.get('port')}`);
});