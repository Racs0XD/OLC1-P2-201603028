const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function Switch(_instruccion, _ambito) {
    var id = _instruccion.expresion.tipo

    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var cBreak = false
    var cContinue = false
    var cReturn = false
    if (id === "VAL_IDENTIFICADOR") {
        if (_instruccion.lista_case != null) {
            for (let i = 0; i < _instruccion.lista_case.length; i++) {
                var op = Operacion(_instruccion.lista_case[i].expresion, _ambito)
                if (op.tipo == operacion.tipo) {
                    if (op.valor == operacion.valor) {
                        var nuevoAmbito = new Ambito(_ambito)
                        const Bloque = require("./Bloque");
                        var ejecutar = Bloque(_instruccion.lista_case[i].instruccionesCase, nuevoAmbito)
                        cBreak = ejecutar.cBreak;
                        cContinue = ejecutar.cContinue;
                        cReturn = ejecutar.cReturn;
                        mensaje += ejecutar.cadena

                        if (cBreak == true) {

                            return {
                                cBreak: cBreak,
                                cadena: mensaje
                            }

                        }

                    }
                }
                else {
                    mensaje += `Error: No es una condicion válida para el switch... Linea: ${_instruccion.lista_case[i].linea} Columna: ${_instruccion.lista_case[i].columna}`
                }
            }

            if (_instruccion.instruccionesDefault != null) {
                const Bloque = require("./Bloque");
                var ejecutar = Bloque(_instruccion.instruccionesDefault, nuevoAmbito)
                cBreak = ejecutar.cBreak;
                cContinue = ejecutar.cContinue;
                cReturn = ejecutar.cReturn;
                mensaje += ejecutar.cadena

                return {
                    cBreak: cBreak,
                    cContinue: cContinue,
                    cReturn: cReturn,
                    cadena: mensaje
                }
            }


        }
        else {
            const Bloque = require("./Bloque");
            var ejecutar = Bloque(_instruccion.instruccionesDefault, nuevoAmbito)
            cBreak = ejecutar.cBreak;
            cContinue = ejecutar.cContinue
            cReturn = ejecutar.cReturn;
            mensaje += ejecutar.cadena

            return {
                cBreak: cBreak,
                cContinue: cContinue,
                cReturn: cReturn,
                cadena: mensaje
            }
        }

    }
    return {
        cBreak: cBreak,
        cadena: `Error: No es una condicion válida para el switch... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = Switch