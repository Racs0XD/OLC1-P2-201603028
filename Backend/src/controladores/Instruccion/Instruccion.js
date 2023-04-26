
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");


function nuevaOperacion(_opizq, _opDer, _tipo, _linea, _columna) {
    return {
        opIzq: _opizq,
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna,
    }
}
function nuevaUnaria(_opDer, _tipo, _linea, _columna) {
    return {
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna,
    }
}
const Instruccion = {
    nuevoPrint: function (_expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    }, nuevoValor: function (_valor, _tipo, _linea, _columna) {
        return {
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    }, nuevaOperacionBinaria: function (_opizq, _opDer, _tipo, _linea, _columna) {
        return nuevaOperacion(_opizq, _opDer, _tipo, _linea, _columna);
    }, nuevaOperacionUnaria: function (_opDer, _tipo, _linea, _columna) {
        return nuevaUnaria(_opDer, _tipo, _linea, _columna);
    }, nuevaAsignacion: function (_id, _expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    }, nuevaDeclaracion: function (_id, _valor, _tipo, _linea, _columna) {
        return {

            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    }, nuevoMain: function (_nombre, _lista_valores, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.MAIN,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    }, nuevoMetodo: function (_nombre, _lista_parametros, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DEC_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevaLlamada: function (_nombre, _lista_valores, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.LLAMADA_METODO,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    }, nuevaFuncion: function (_tipo, _nombre, _lista_parametros, _instrucciones, _retorno, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DEC_FUNCION,
            tipof: _tipo,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            retorno: _retorno,
            linea: _linea,
            columna: _columna
        }
    }, nuevaLlamadaFuncion: function (_nombre, _lista_valores, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.LLAMADA_FUNCION,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIf: function (_expresion, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIfElse: function (_expresion, _instruccionesIf, _instruccionesElse, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.IFE,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    }, nuevoElseIf: function (_expresion, _instruccionesElseIf, _linea, _columna, _idSentencia) {
        return {
            tipo: TIPO_INSTRUCCION.ELSEIF,
            expresion: _expresion,
            instruccionesElseIf: _instruccionesElseIf,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    }, nuevoIfElseIf: function (_expresion, _instruccionesIf, _lista_elseif, _instruccionesElse, _linea, _columna, _idSentencia) {
        return {
            tipo: TIPO_INSTRUCCION.IFEIF,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            lista_elseif: _lista_elseif,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    }, nuevoSwitch: function (_expresion, _lista_case, _instruccionesDefault, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.SWITCH,
            expresion: _expresion,
            lista_case: _lista_case,
            instruccionesDefault: _instruccionesDefault,
            linea: _linea,
            columna: _columna
        }
    }, nuevoCase: function (_expresion, _instruccionesCase, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.CASE,
            expresion: _expresion,
            instruccionesCase: _instruccionesCase,
            linea: _linea,
            columna: _columna
        }
    }, nuevoWhile: function (_expresion, _instrucciones, _linea, _columna, _idSentencia) {
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    }, nuevoDoWhile: function (_expresion, _instrucciones, _linea, _columna, _idSentencia) {
        return {
            tipo: TIPO_INSTRUCCION.DOWHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    }, nuevoFor: function (_expresion, _condicion, _actualizacion, _instrucciones, _linea, _columna, _idSentencia) {
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            expresion: _expresion,
            condicion: _condicion,
            actualizacion: _actualizacion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    }, nuevoBreak: function (_linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna
        }
    }, nuevoContinue: function (_linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.CONTINUE,
            linea: _linea,
            columna: _columna
        }
    }, nuevoReturn: function (_linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.RETURN,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIncremento: function (_id, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.INCREMENTO,
            id: _id,
            linea: _linea,
            columna: _columna
        }
    }, nuevoDecremento: function (_id, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DECREMENTO,
            id: _id,
            linea: _linea,
            columna: _columna
        }
    },


}
module.exports = Instruccion;
