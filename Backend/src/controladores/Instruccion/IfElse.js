const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIfElse(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var cBreak=false
    if(operacion.tipo === TIPO_DATO.BOOL){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejecutar = Bloque(_instruccion.instruccionesIf,nuevoAmbito)
            cBreak= ejecutar.cBreak;
            mensaje+=ejecutar.cadena
        }
        else{
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejecutar = Bloque(_instruccion.instruccionesElse,nuevoAmbito)
            cBreak= ejecutar.cBreak;
            mensaje+=ejecutar.cadena
        }
        return {
            cBreak: cBreak,
            cadena: mensaje
        }
    }
    return {
        cBreak: cBreak,
        cadena:  `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = SentenciaIfElse