const procesarCadena = require("../Operaciones/procesarCadena")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")


function Print(_instruccion, _ambito) {
    if (_instruccion.expresion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION) {
        const EjecutarFuncion = require("../Instruccion/EjecutarFuncion");
        var mensaje = EjecutarFuncion(_instruccion.expresion, _ambito)
        //console.log(mensaje)
        if (mensaje != null) {
            return mensaje
        }
    }
    //console.log(_instruccion.expresion)
    //console.log(procesarCadena(_instruccion.expresion, _ambito))
    const    cadena = procesarCadena(_instruccion.expresion, _ambito).valor
    //console.log(cadena)
    return cadena
}
module.exports = Print