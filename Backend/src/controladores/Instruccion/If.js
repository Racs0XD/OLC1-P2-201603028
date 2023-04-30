const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIf(_instruccion, _ambito){    
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);    
    var cBreak=false  
    var cContinue=false 
    var cReturn=false 
    if(operacion.tipo === TIPO_DATO.BOOL){
        //console.log(_instruccion)
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejecutar = Bloque(_instruccion.instrucciones,nuevoAmbito)
            cBreak= ejecutar.cBreak;
            cContinue = ejecutar.cContinue
            cReturn= ejecutar.cReturn;
            mensaje+=ejecutar.cadena    
                     
        }     
        return {
            cBreak: cBreak,
            cContinue: cContinue,
            cReturn: cReturn,
            cadena: mensaje
        }
    }
    return {
        cBreak: cBreak,
        cadena:  `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = SentenciaIf