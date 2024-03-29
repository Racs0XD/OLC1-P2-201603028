const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIfElse(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    // console.log(_instruccion)
    // console.log("=====================================")
    var cBreak=false
    var cContinue=false 
    var cReturn=false
    if(operacion.tipo === TIPO_DATO.BOOL){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejecutar = Bloque(_instruccion.instruccionesIf,nuevoAmbito)
            cBreak= ejecutar.cBreak;
            cContinue= ejecutar.cContinue
            cReturn= ejecutar.cReturn;
            mensaje+=ejecutar.cadena
        }
        else{
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejecutar = Bloque(_instruccion.instruccionesElse,nuevoAmbito)
            cBreak= ejecutar.cBreak;
            cContinue= ejecutar.cContinue
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

module.exports = SentenciaIfElse