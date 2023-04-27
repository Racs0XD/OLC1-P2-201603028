const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operaciones/Operacion")
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");
const Incremento = require("./Incremento");
const Decremento = require("./Decremento");

function For(_instruccion, _ambito){       
    var mensaje = ""
    if(_instruccion.expresion.tipo == 'INST_DECLARACION'){
        Declaracion(_instruccion.expresion, _ambito)
    }else if(_instruccion.expresion.tipo == 'ASIGNACION'){
        Asignacion(_instruccion.expresion, _ambito)
    }    
    var operacion = Operacion(_instruccion.condicion, _ambito)   
    //console.log(operacion)
    if(operacion.tipo === TIPO_DATO.BOOL){        
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejecutar =Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejecutar.cadena
            if(ejecutar.cBreak){
                return mensaje
            }
            if(_instruccion.actualizacion.tipo == 'INCREMENTO'){
                inc = Incremento(_instruccion.actualizacion, _ambito)
            }else if(_instruccion.actualizacion.tipo == 'DECREMENTO'){
                inc = Decremento(_instruccion.actualizacion, _ambito)
            }else if(_instruccion.actualizacion.tipo == 'ASIGNACION'){
                inc = Asignacion(_instruccion.actualizacion, _ambito)
            }            
            operacion = Operacion(_instruccion.condicion, _ambito)
        }
        return mensaje
    }
    return `\n Error: No es una expresion de tipo BOOL en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = For