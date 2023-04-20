const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIfElseIf(_instruccion, _ambito) {
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var cBreak = false
    console.log("IFELSEIF")
    if (operacion.tipo === TIPO_DATO.BOOL) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejecutar = Bloque(_instruccion.instruccionesIf, nuevoAmbito)
            cBreak = ejecutar.cBreak;
            mensaje += ejecutar.cadena
            return {
                cBreak: cBreak,
                cadena: mensaje
            }
        }
        for (let i = 0; i < _instruccion.lista_elseif.length; i++) {
            var op = Operacion(_instruccion.lista_elseif[i].expresion, _ambito)
            if (op.tipo === TIPO_DATO.BOOL) {
                if (op.valor) {
                    var nuevoAmbito = new Ambito(_ambito)
                    const Bloque = require("./Bloque");
                    var ejecutar = Bloque(_instruccion.lista_elseif[i].instruccionesElseIf, nuevoAmbito)
                    cBreak = ejecutar.cBreak;
                    mensaje += ejecutar.cadena
                    return {
                        cBreak: cBreak,
                        cadena: mensaje
                    }
                }
            }
            else {
                mensaje += `Error: No es una condicion válida para el if... Linea: ${_instruccion.lista_elseif[i].linea} Columna: ${_instruccion.lista_elseif[i].columna}`
            }
        }
        if(_instruccion.instruccionesElse!=null){            
            const Bloque = require("./Bloque");
            var nuevoAmbito = new Ambito(_ambito);
            var ejecutar = Bloque(_instruccion.instruccionesElse, nuevoAmbito)
            cBreak = ejecutar.cBreak;
            mensaje += ejecutar.cadena
        }
        return {
            cBreak: cBreak,
            cadena: mensaje
        }
    }
    return {
        cBreak: cBreak,
        cadena: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = SentenciaIfElseIf