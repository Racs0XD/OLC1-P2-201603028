const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")

function Logica(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR) {
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return Relacional(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR) {
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.AND) {
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.NOT) {
        return not(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.TERNARIO) {
        return ternario(_expresion.op1, _expresion.op2, _expresion.op3, _ambito)
    }
}

function or(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BOOL) {
        var resultado = false
        if (opIzq.valor || opDer.valor) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function and(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BOOL) {
        var resultado = false
        if (opIzq.valor && opDer.valor) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function not(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    if (opIzq.tipo == "BOOL") {
        var resultado = false
        if (opIzq.valor == false) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + `\nError semántico: no se puede negar el valor de tipo ${opIzq.tipo}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function ternario(_op1, _op2, _op3, _ambito) {
    const op1 = Logica(_op1, _ambito)
    const op2 = Operacion(_op2, _ambito)
    const op3 = Operacion(_op3, _ambito)
    if (op1.tipo == "BOOL") {
        if (op1.valor == true) {
            return {
                valor: op2.valor,
                tipo: op2.tipo,
                linea: op2.linea,
                columna: op2.columna
            }
        } else {
            return {
                valor: op3.valor,
                tipo: op3.tipo,
                linea: op3.linea,
                columna: op3.columna
            }

        }

    }
    var respuesta = (op1.tipo === null ? op1.valor : "")
    return {
        valor: respuesta + `\nError semántico: no se puede realizar la operacion ternaria del valor de tipo ${op1.tipo}`,
        tipo: null,
        linea: op1.linea,
        columna: op1.columna
    }
}

module.exports = Logica