const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")
const Cadenas = require("./Cadenas");



function Aritmetica(_expresion, _ambito) {
    if(_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION){
        const EjecutarFuncion = require("../Instruccion/EjecutarFuncion");;
        var mensaje = EjecutarFuncion(_expresion, _ambito)
        if(mensaje!=null){
            if(mensaje === ""){
                mensaje = "vacío"
                return {
                    valor:mensaje,
                    tipo:TIPO_DATO.CADENA
                } 
            } else {
                return {
                    valor:mensaje,
                    tipo:TIPO_DATO.CADENA
                } 
            }
              
        }
    } else if (_expresion.tipo === TIPO_VALOR.DECIMAL || 
        _expresion.tipo === TIPO_VALOR.BOOL || 
        _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA || 
        _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || 
        _expresion.tipo === TIPO_VALOR.CHAR || 
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
      return suma(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.RESTA) {
      return resta(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
      return multiplicacion(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.DIVISION) {
      return division(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.POTENCIA) {
      return potencia(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.MODULO) {
      return modular(Aritmetica(_expresion.opIzq, _ambito), Aritmetica(_expresion.opDer, _ambito), _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.UNARIA) {
      return menosUnario(Aritmetica(_expresion.opDer, _ambito), _ambito);
    }
  }
  


function suma(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
        opIzq = _opizq; 
    } 
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)
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

    }

}

function resta(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
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
    }
}

function multiplicacion(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
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
    }
}

function division(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito);
    var opDer = Aritmetica(_opDer, _ambito);
    
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
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
    }
}

function potencia(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
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
    }
}

function modular(_opizq, _opDer, _ambito) {
    var opIzq = Aritmetica(_opizq, _ambito)
    var opDer = Aritmetica(_opDer, _ambito)   
    if(opDer === undefined){
        opDer = _opDer; 
    }
    if(opIzq === undefined){
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
    }
}

function menosUnario(_opDer, _ambito) {
    var opDer = Aritmetica(_opDer, _ambito)
    if(opDer === undefined){
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


module.exports = Aritmetica;