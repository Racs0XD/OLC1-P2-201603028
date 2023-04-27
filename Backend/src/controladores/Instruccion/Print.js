const procesarCadena = require("../Operaciones/procesarCadena")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")


function Print(_instruccion, _ambito) {
    if (_instruccion.expresion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION) {
        const EjecutarFuncion = require("../Instruccion/EjecutarFuncion");
        var mensaje = EjecutarFuncion(_instruccion.expresion, _ambito)
        console.log(mensaje)
        if (mensaje != null) {
            return mensaje
        }
    }

    const    cadena = procesarCadena(_instruccion.expresion, _ambito).valor
    
    return cadena
}
module.exports = Print