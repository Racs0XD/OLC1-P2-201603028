const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");

function ValorExpresion(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL) {
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.DECIMAL,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    } else if (_expresion.tipo === TIPO_VALOR.BOOL) {
        return {
            valor: _expresion.valor.toLowerCase() === 'true' ? true : false,
            tipo: TIPO_DATO.BOOL,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if (_expresion.tipo === TIPO_VALOR.CADENA) {
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length - 1),
            tipo: TIPO_DATO.CADENA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if (_expresion.tipo === TIPO_VALOR.ENTERO) {
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.ENTERO,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    } else if (_expresion.tipo === TIPO_VALOR.CHAR) {
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length - 1),
            tipo: TIPO_DATO.CHAR,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    } else if (_expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {   
        //console.log(_expresion)     
        const simbolo = _ambito.getSimbolo(_expresion.valor)
        if (simbolo != null) {
            return {
                valor: simbolo.valor,
                tipo: simbolo.tipo,
                linea: simbolo.linea,
                columna: simbolo.columna
            }
        }
        return {
            valor: "Error: la variable " + _expresion.valor + " no existe Linea: " + _expresion.linea + " columna: " + _expresion.columna,
            tipo: null,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    } else if (_expresion.tipo === TIPO_VALOR.VECTOR) {
        //console.log(_expresion)
        const simbolo = _ambito.getSimbolo(_expresion.valor)
        if (simbolo != null) {
            //console.log(_expresion.indice)
            if (_expresion.indice.tipo == 'VAL_IDENTIFICADOR') {
                indice = _ambito.getSimbolo(_expresion.indice.valor)
                return {
                    valor: simbolo.valor[indice.valor],
                    tipo: simbolo.tipo,
                    linea: simbolo.linea,
                    columna: simbolo.columna
                }
            }

            else if (_expresion.indice.tipo == 'SUMA') {
                idindice = _ambito.getSimbolo(_expresion.indice.opIzq.valor)
                indiceb = _expresion.indice.opDer.valor

                indice = idindice.valor + indiceb
                //console.log(indice)

                return {
                    valor: simbolo.valor[indice],
                    tipo: simbolo.tipo,
                    linea: simbolo.linea,
                    columna: simbolo.columna
                }
            }

            else if (_expresion.indice.tipo == 'RESTA') {
                idindice = _ambito.getSimbolo(_expresion.indice.opIzq.valor)
                indiceb = _expresion.indice.opDer.valor

                indice = idindice.valor - indiceb
                //console.log(indice)

                return {
                    valor: simbolo.valor[indice],
                    tipo: simbolo.tipo,
                    linea: simbolo.linea,
                    columna: simbolo.columna
                }
            }

            return {
                valor: simbolo.valor[_expresion.indice.valor],
                tipo: simbolo.tipo,
                linea: simbolo.linea,
                columna: simbolo.columna
            }
        }
        return {
            valor: "Error: la variable '" + _expresion.valor + "' no existe... Linea: " + _expresion.linea + " Columna: " + _expresion.columna,
            tipo: null,
            linea: _expresion.linea,
            columna: _expresion.columna
        }

    }

    else if (_expresion.tipo === TIPO_VALOR.LISTA) {
        

        const simbolo = _ambito.getSimbolo(_expresion.id)
        if (simbolo != null) {

            if (_expresion.expresion.tipo == 'VAL_IDENTIFICADOR') {
                indice = _ambito.getSimbolo(_expresion.expresion.valor)
                return {
                    valor: simbolo.valor[indice.valor],
                    tipo: simbolo.tipo,
                    linea: simbolo.linea,
                    columna: simbolo.columna
                }
            }

            return {
                valor: simbolo.valor[_expresion.expresion.valor],
                tipo: simbolo.tipo,
                linea: simbolo.linea,
                columna: simbolo.columna
            }
        }
        return {
            valor: "Error: la variable '" + _expresion.valor + "' no existe... Linea: " + _expresion.linea + " Columna: " + _expresion.columna,
            tipo: null,
            linea: _expresion.linea,
            columna: _expresion.columna
        }

    }
}

module.exports = ValorExpresion;