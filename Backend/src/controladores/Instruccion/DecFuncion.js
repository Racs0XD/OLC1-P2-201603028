const Funcion = require("../Ambito/Funcion")
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");

function DecFuncion(_instruccion, _ambito){
   
    if(_instruccion.lista_parametros[0].tipo == 'INST_DECLARACION'){
        Declaracion(_instruccion.lista_parametros[0], _ambito)
    }else if(_instruccion.lista_parametros[0].tipo == 'ASIGNACION'){
        Asignacion(_instruccion.lista_parametros[0], _ambito)
    }   
    const nuevaFuncion = new Funcion(_instruccion.tipo ,_instruccion.nombre, "FUNCION", _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna)
    if(_ambito.existeSimbolo(nuevaFuncion.id)!=false){
        return `Error: No se puede declarar un metodo con el mismo nombre \n de una variable '${nuevaFuncion.id}'... Linea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}`
    }
    else if(_ambito.existeFuncion(nuevaFuncion.id)!=false){
        return `Error: El método '${nuevaFuncion.id}' ya existe... Linea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}`
    }
    _ambito.addFuncion(nuevaFuncion.id, nuevaFuncion)    
    return null
}

module.exports = DecFuncion