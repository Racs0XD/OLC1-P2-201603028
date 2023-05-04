const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")
const Cadenas = require("./Cadenas");


function OperacionesVarias(_expresion, _ambito) {
    //console.log(_expresion)
    if (_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION) {

        const EjecutarFuncion = require("../Instruccion/EjecutarFuncion")
        var mensaje = EjecutarFuncion(_expresion, _ambito)
        //console.log(_expresion.lista_valores[0])
        //console.log(mensaje)
        if (mensaje != null) {
            if (mensaje === "") {
                mensaje = "vacío"
                return mensaje
            } else {
                return mensaje
            }

        }
    } else if (_expresion.tipo === TIPO_VALOR.DECIMAL ||
        _expresion.tipo === TIPO_VALOR.BOOL ||
        _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA ||
        _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CHAR ||
        _expresion.tipo === TIPO_VALOR.VECTOR ||
        _expresion.tipo === TIPO_VALOR.LISTA ||
        _expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
        return ValorExpresion(_expresion, _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.TOUPPER ||
        _expresion.tipo === TIPO_OPERACION.TOLOWER ||
        _expresion.tipo === TIPO_OPERACION.LENGTH ||
        _expresion.tipo === TIPO_OPERACION.TRUNCATE ||
        _expresion.tipo === TIPO_OPERACION.ROUND ||
        _expresion.tipo === TIPO_OPERACION.TYPEOF ||
        _expresion.tipo === TIPO_OPERACION.TOSTRING) {
        return Cadenas(_expresion, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.SUMA) {
        return suma(OperacionesVarias(_expresion.opIzq, _ambito), OperacionesVarias(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.RESTA) {
        return resta(OperacionesVarias(_expresion.opIzq, _ambito), OperacionesVarias(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
        return multiplicacion(OperacionesVarias(_expresion.opIzq, _ambito), OperacionesVarias(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.DIVISION) {
        return division(OperacionesVarias(_expresion.opIzq, _ambito), OperacionesVarias(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.POTENCIA) {
        return potencia(OperacionesVarias(_expresion.opIzq, _ambito), OperacionesVarias(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.MODULO) {        
        return modular(OperacionesVarias(_expresion.opIzq, _ambito), OperacionesVarias(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.UNARIA) {
        return menosUnario(OperacionesVarias(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.OR) {
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.AND) {
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.NOT) {
        return not(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TERNARIO) {
        return ternario(_expresion.op1, _expresion.op2, _expresion.op3, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.TERNARIO) {
        return Ternario(_expresion, _ambito, _Error, _entorno, Simbol)
    } else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL) {
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.DIFERENTE) {
        return diferente(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.MENOR) {
        return menor(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.MENORIGUAL) {
        return menorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.MAYOR) {
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito)
    } else if (_expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

let respuesta = {
    LIns: [],
    err: ""
};

function suma(_opizq, _opDer, _ambito) {

    var opIzq = _opizq
    var opDer = _opDer
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo);
    if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                if (opIzq.tipo === TIPO_DATO.BOOL) {
                    if (opIzq.valor === true) {
                        const resultado = 1 + Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = 0 + Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
                else if (opDer.tipo === TIPO_DATO.BOOL) {
                    if (opDer.valor === true) {
                        const resultado = Number(opIzq.valor) + 1;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = Number(opIzq.valor) + 0;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number((opIzq.valor).charCodeAt(0)) + Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }

                }
                else if (opDer.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number(opIzq.valor) + Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            } else {
                const resultado = Number(opIzq.valor) + Number(opDer.valor);

                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna

                }
            }


        }
        if (tipores === TIPO_DATO.CADENA) {
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opizq.linea,
                columna: _opizq.columna

            }

        }

    } else {
        var respuesta_err = " Tipo de Error: Semantico, Descirpcion: No se pudo realizar operacion, Linea: "  + _opizq.linea + ", Columna: " + _opDer.column ; 
        var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
        return{
            valor: respuesta+",\n"+respuesta_err,
            tipo: null,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    }

}

function resta(_opizq, _opDer, _ambito) {

    var opIzq = OperacionesVarias(_opizq, _ambito)
    var opDer = OperacionesVarias(_opDer, _ambito)

    if (opDer === undefined) {
        opDer = _opDer;
    }
    if (opIzq === undefined) {
        opIzq = _opizq;
    }



    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)

    if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
        return {
            valor: "No se puede realizar la resta con cadenas",
            tipo: tipores,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    } else if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                if (opIzq.tipo === TIPO_DATO.BOOL) {
                    if (opIzq.valor === true) {
                        const resultado = 1 - Number(opDer.valor);

                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {

                        const resultado = 0 - Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
                else if (opDer.tipo === TIPO_DATO.BOOL) {
                    if (opDer.valor === true) {
                        const resultado = Number(opIzq.valor) - 1;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = Number(opIzq.valor) - 0;
                        
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number((opIzq.valor).charCodeAt(0)) - Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }

                }
                else if (opDer.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number(opIzq.valor) - Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            } else {
                const resultado = Number(opIzq.valor) - Number(opDer.valor);                
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna

                }
            }


        }
    } else {
        var respuesta_err = " Tipo de Error: Semantico, Descirpcion: No se pudo realizar operacion, Linea: "  + _opizq.linea + ", Columna: " + _opDer.column ; 
        var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
        return{
            valor: respuesta+",\n"+respuesta_err,
            tipo: null,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    }
}

function multiplicacion(_opizq, _opDer, _ambito) {
    var opIzq = OperacionesVarias(_opizq, _ambito)
    var opDer = OperacionesVarias(_opDer, _ambito)
    if (opDer === undefined) {
        opDer = _opDer;
    }
    if (opIzq === undefined) {
        opIzq = _opizq;
    }
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
    if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
        return {
            valor: "No se puede realizar la multiplicacion con cadenas",
            tipo: tipores,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    } else if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                if (opIzq.tipo === TIPO_DATO.BOOL) {
                    if (opIzq.valor === true) {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
                else if (opDer.tipo === TIPO_DATO.BOOL) {
                    if (opDer.valor === true) {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else {
                        const resultado = "Error no se puede hacer multiplicacion con booleanos";
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number((opIzq.valor).charCodeAt(0)) * Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna
                    }
                }
                else if (opDer.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number(opIzq.valor) * Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna
                    }
                }
            } else {
                const resultado = Number(opIzq.valor) * Number(opDer.valor);
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna
                }
            }
        }
    } else {
        var respuesta_err = " Tipo de Error: Semantico, Descirpcion: No se pudo realizar operacion, Linea: "  + _opizq.linea + ", Columna: " + _opDer.column ; 
        var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
        return{
            valor: respuesta+",\n"+respuesta_err,
            tipo: null,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    }
}

function division(_opizq, _opDer, _ambito) {
    var opIzq = OperacionesVarias(_opizq, _ambito);
    var opDer = OperacionesVarias(_opDer, _ambito);

    if (opDer === undefined) {
        opDer = _opDer;
    }
    if (opIzq === undefined) {
        opIzq = _opizq;
    }


    const tipores = TipoResultado(opIzq.tipo, opDer.tipo);
    if (opIzq.tipo === TIPO_DATO.CADENA || opDer.tipo === TIPO_DATO.CADENA) {
        return {
            valor: "No se puede realizar la division con cadenas",
            tipo: tipores,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    } else if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                const resultado = "Error no se puede hacer division con booleanos";
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna
                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    opIzq.valor = Number((opIzq.valor).charCodeAt(0));
                }
                if (opDer.tipo === TIPO_DATO.CHAR) {
                    opDer.valor = Number((opDer.valor).charCodeAt(0));
                }
            }
            if (opDer.valor === 0) {
                const resultado = "Error división entre cero";
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opDer.linea,
                    columna: _opDer.columna
                }
            }
            const resultado = Number(opIzq.valor) / Number(opDer.valor);
            return {
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _opizq.linea,
                columna: _opizq.columna
            }
        }
    }else {
        var respuesta_err = " Tipo de Error: Semantico, Descirpcion: No se pudo realizar operacion, Linea: "  + _opizq.linea + ", Columna: " + _opDer.column ; 
        var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
        return{
            valor: respuesta+",\n"+respuesta_err,
            tipo: null,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    }
}

function potencia(_opizq, _opDer, _ambito) {
    var opIzq = OperacionesVarias(_opizq, _ambito)
    var opDer = OperacionesVarias(_opDer, _ambito)
    if (opDer === undefined) {
        opDer = _opDer;
    }
    if (opIzq === undefined) {
        opIzq = _opizq;
    }

    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)


    if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
                if (opIzq.tipo === TIPO_DATO.ENTERO) {
                    if (opDer.tipo === TIPO_DATO.ENTERO) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                } else if (opIzq.tipo === TIPO_DATO.DECIMAL) {
                    if (opDer.tipo === TIPO_DATO.ENTERO) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = Math.pow(opIzq.valor, opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
            }
        } else {
            const resultado = "Error no se puede hacer potencia";
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opizq.linea,
                columna: _opizq.columna
            }
        }
    } else {
        var respuesta_err = " Tipo de Error: Semantico, Descirpcion: No se pudo realizar operacion, Linea: "  + _opizq.linea + ", Columna: " + _opDer.column ; 
        var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
        return{
            valor: respuesta+",\n"+respuesta_err,
            tipo: null,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    }
}

function modular(_opizq, _opDer, _ambito) {
    var opIzq = OperacionesVarias(_opizq, _ambito)
    var opDer = OperacionesVarias(_opDer, _ambito)
    if (opDer === undefined) {
        opDer = _opDer;
    }
    if (opIzq === undefined) {
        opIzq = _opizq;
    }
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
    if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL) {
            if (opIzq.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.ENTERO) {
                if (opIzq.tipo === TIPO_DATO.ENTERO) {
                    if (opDer.tipo === TIPO_DATO.ENTERO) {
                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                } else if (opIzq.tipo === TIPO_DATO.DECIMAL) {

                    if (opDer.tipo === TIPO_DATO.ENTERO) {

                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    } else if (opDer.tipo === TIPO_DATO.DECIMAL) {
                        const resultado = opIzq.valor % opDer.valor;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
                        }
                    }
                }
            }
        } else {

            const resultado = "Error no se puede hacer modulo";
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opizq.linea,
                columna: _opizq.columna
            }
        }
    } else {
        var respuesta_err = " Tipo de Error: Semantico, Descirpcion: No se pudo realizar operacion, Linea: "  + _opizq.linea + ", Columna: " + _opDer.column ; 
        var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
        return{
            valor: respuesta+",\n"+respuesta_err,
            tipo: null,
            linea: _opizq.linea,
            columna: _opizq.columna
        }
    }
}

function menosUnario(_opDer, _ambito) {
    var opDer = OperacionesVarias(_opDer, _ambito)
    if (opDer === undefined) {
        opDer = _opDer;
    }
    if (opDer.tipo === TIPO_DATO.DECIMAL || opDer.tipo === TIPO_DATO.ENTERO) {
        const resultado = opDer.valor * -1;
        return {
            valor: resultado,
            tipo: opDer.tipo,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    } else {
        const resultado = "Error no se puede hacer negación.";
        return {
            valor: resultado,
            tipo: opDer.tipo,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    }
}


function or(_opIzq, _opDer, _ambito) {
    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
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

    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
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

    const opIzq = OperacionesVarias(_opDer, _ambito)

    if (opIzq.tipo == "BOLEANO") {
        var resultado = !opIzq.valor
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opDer.linea,
            columna: _opDer.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + `\nError semántico: no se puede negar el valor de tipo ${opIzq.tipo}`,
        tipo: null,
        linea: _opDer.linea,
        columna: _opDer.columna
    }
}

function ternario(_op1, _op2, _op3, _ambito) {
    const op1 = OperacionesVarias(_op1, _ambito)
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

function igualigual(_opIzq, _opDer, _ambito) {
    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.BOOL && opDer.tipo == TIPO_DATO.BOOL) ||
        (opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA)) {
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

function diferente(_opIzq, _opDer, _ambito) {
    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)
            (opIzq.tipo == TIPO_DATO.BOOL && opDer.tipo == TIPO_DATO.BOOL) ||
        (opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA)) {
        var resultado = true
        if (opIzq.valor == opDer.valor) {
            resultado = false
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}

function menor(_opIzq, _opDer, _ambito) {
    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)) {
        var resultado = false
        if (opIzq.valor < opDer.valor) {
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

function menorigual(_opIzq, _opDer, _ambito) {
    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)) {
        var resultado = false
        if (opIzq.valor <= opDer.valor) {
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

function mayor(_opIzq, _opDer, _ambito) {
    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)) {
        var resultado = false
        if (opIzq.valor > opDer.valor) {
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

function mayorigual(_opIzq, _opDer, _ambito) {
    const opIzq = OperacionesVarias(_opIzq, _ambito)
    const opDer = OperacionesVarias(_opDer, _ambito)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) ||
        (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) ||
        (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)) {
        var resultado = false
        if (opIzq.valor >= opDer.valor) {
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

module.exports = OperacionesVarias;