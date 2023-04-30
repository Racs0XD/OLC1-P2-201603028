const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")
const Operacion = require("../Operaciones/Operacion")



function Return(_instruccion, _ambito) {
    //console.log(_instruccion.retorno)
    if (_instruccion.retorno.valor === null || _instruccion.retorno.valor === undefined) {
        return Operacion(_instruccion.retorno, _ambito).valor
    } else {
        return _instruccion.retorno.valor
    }
    

   
}

module.exports = Return