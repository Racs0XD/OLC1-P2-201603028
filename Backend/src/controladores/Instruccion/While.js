const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operaciones/Operacion")
const Ambito = require("../Ambito/Ambito")
function While(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    //console.log(_instruccion.expresion)
    if(operacion.tipo === TIPO_DATO.BOOL){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejecutar = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejecutar.cadena
            if(ejecutar.cBreak){                
                return mensaje
            }
            if(ejecutar.cContinue){
                operacion = Operacion(_instruccion.expresion, _ambito)
            }
            operacion = Operacion(_instruccion.expresion, _ambito)
        }        
        return mensaje
        }  
    return `\n Error: No es una expresion de tipo BOOL en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = While