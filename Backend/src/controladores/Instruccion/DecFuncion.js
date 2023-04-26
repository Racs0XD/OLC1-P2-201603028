const Funcion = require("../Ambito/Funcion")

function DecFuncion(_instruccion, _ambito){
    const nuevaFuncion = new Funcion(_instruccion.tipo ,_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna)
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