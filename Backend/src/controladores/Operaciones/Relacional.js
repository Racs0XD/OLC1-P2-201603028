const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const Ternario = require("./Ternario");
const ValorExpresion = require("./ValorExpresion");

function Relacional(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL ||
        _expresion.tipo === TIPO_VALOR.BOOL ||
        _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA ||
        _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CHAR ||
        _expresion.tipo === TIPO_VALOR.VECTOR ||
        _expresion.tipo === TIPO_VALOR.LISTA ||
        _expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
        return ValorExpresion(_expresion, _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.SUMA ||
        _expresion.tipo === TIPO_OPERACION.RESTA ||
        _expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||
        _expresion.tipo === TIPO_OPERACION.DIVISION ||
        _expresion.tipo === TIPO_OPERACION.POTENCIA ||
        _expresion.tipo === TIPO_OPERACION.MODULO ||
        _expresion.tipo === TIPO_OPERACION.UNARIA ||
        _expresion.tipo === TIPO_OPERACION.NEGACION) {
        return Aritmetica(_expresion, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TERNARIO) {
        return Ternario(_expresion, _ambito, _Error, _entorno, Simbol)
    } else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL) {
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function igualigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)) {
        var resultado = false
        if (opIzq.valor == opDer.valor) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }


}
module.exports = Relacional