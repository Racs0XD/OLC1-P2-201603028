const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")


function Cadenas(_expresion, _ambito) {

    if (_expresion.tipo === TIPO_VALOR.DECIMAL ||
        _expresion.tipo === TIPO_VALOR.BOOL ||
        _expresion.tipo === TIPO_VALOR.CADENA ||
        _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CHAR ||
        _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.VECTOR ||
        _expresion.tipo === TIPO_VALOR.LISTA) {
        return ValorExpresion(_expresion, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TOUPPER) {
        return toupper(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TOLOWER) {
        return tolower(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.LENGTH) {
        return length(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TRUNCATE) {
        return truncate(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.ROUND) {
        return round(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TYPEOF) {
        return typeoffuncion(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TOSTRING) {
        return tostringfuncion(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function toupper(_opIzq, _opDer, _ambito) {
    const opIzq = Cadenas(_opIzq, _ambito)
    const opDer = Cadenas(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    if (tipoRes != null) {
        if (tipoRes === TIPO_DATO.CADENA) {

            str1 = opIzq.valor

            const resultado = str1.toUpperCase();

            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la funcion toupper... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function tolower(_opIzq, _opDer, _ambito) {
    const opIzq = Cadenas(_opIzq, _ambito)
    const opDer = Cadenas(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    if (tipoRes != null) {
        if (tipoRes === TIPO_DATO.CADENA) {

            str1 = opIzq.valor

            const resultado = str1.toLowerCase();

            return {
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la funcion toupper... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function length(_opIzq, _opDer, _ambito) {
    console.log(_opDer)
    const opIzq = Cadenas(_opIzq, _ambito)
    const opDer = Cadenas(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    if (Array.isArray(opIzq.valor)) {
        const resultado = opIzq.valor.length;

        return {
            valor: resultado,
            tipo: TIPO_DATO.ENTERO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }

    }

    if (tipoRes != null) {
        if (tipoRes === TIPO_DATO.CADENA) {

            str1 = opIzq.valor

            const resultado = str1.length;

            return {
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la funcion length... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function truncate(_opIzq, _opDer, _ambito) {
    const opIzq = Cadenas(_opIzq, _ambito)
    const opDer = Cadenas(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    if (tipoRes != null) {
        if (tipoRes === TIPO_DATO.ENTERO || tipoRes === TIPO_DATO.DECIMAL) {

            num1 = opIzq.valor

            const resultado = Math.trunc(Number(num1));

            return {
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la funcion truncate... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function round(_opIzq, _opDer, _ambito) {
    const opIzq = Cadenas(_opIzq, _ambito)
    const opDer = Cadenas(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    if (tipoRes != null) {
        if (tipoRes === TIPO_DATO.ENTERO || tipoRes === TIPO_DATO.DECIMAL) {

            num1 = opIzq.valor

            const resultado = Math.round(Number(num1));

            return {
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la funcion round... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function typeoffuncion(_opIzq, _opDer, _ambito) {
    const opIzq = Cadenas(_opIzq, _ambito)
    const opDer = Cadenas(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    if (tipoRes != null) {
        if (tipoRes == 'ENTERO') {
            var resultado = "INT";
        } else if (tipoRes == 'DECIMAL') {
            var resultado = "DOUBLE";
        } else if (tipoRes == 'BOLEANO') {
            var resultado = "BOOLEAN";
        } else if (tipoRes == 'CADENA') {
            var resultado = "STRING";
        } else if (tipoRes == "CHAR") {
            var resultado = "CHAR";
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }

    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la funcion typeof... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function tostringfuncion(_opIzq, _opDer, _ambito) {
    const opIzq = Cadenas(_opIzq, _ambito)
    const opDer = Cadenas(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)

    if (tipoRes != null) {


        valor = opIzq.valor

        const resultado = valor.toString();

        return {
            valor: resultado,
            tipo: TIPO_DATO.CADENA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }

    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la funcion round... Linea: ' + _opIzq.linea + " Columna: " + _opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Cadenas