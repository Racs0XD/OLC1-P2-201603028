const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")

function Ejecutar(_instruccion, _ambito) {
    var cadena = ""
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)

    if (metodoEjecutar != null) {
        
        var nuevoAmbito = new Ambito(_ambito)
        if (metodoEjecutar.lista_parametro != null) {
            if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametro.length == _instruccion.lista_valores.length) {
                var error = false;
                console.log(metodoEjecutar.lista_parametro.length)
                for (let i = 0; i < metodoEjecutar.lista_parametro.length; i++) {
                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametro[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametro[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                    var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                    if (mensaje != null) {
                        error = true
                        cadena += mensaje + '\n'
                    }
                }
                if (error) {
                    return cadena
                }
                var ejecutar = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = ejecutar.cadena
                if (ejecutar.hayBreak) {
                    mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
                }
                return mensaje
            }
            else {
                return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }
        }
        else {
            var ejecutar = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
            var mensaje = ejecutar.cadena
            if (ejecutar.hayBreak) {
                mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
            }
            return mensaje
        }

    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Ejecutar