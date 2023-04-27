const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")

function Ejecutar(_instruccion, _ambito) {
    var cadena = ""
    var ejecutar;
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    var funcionEjecutar = _ambito.getFuncion(_instruccion.nombre)

    if (metodoEjecutar == null) {
        ejecutar = funcionEjecutar
    } else if (funcionEjecutar == null) {
        ejecutar = metodoEjecutar
    } else {
        return `Error: El método o la función ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }

    var nuevoAmbito = new Ambito(_ambito)
    if (ejecutar.lista_parametro != null) {
        if (_instruccion.lista_valores != null && ejecutar.lista_parametro.length == _instruccion.lista_valores.length) {
            var error = false;
            
            for (let i = 0; i < ejecutar.lista_parametro.length; i++) {
                var declaracionAsignacion = Instruccion.nuevaDeclaracion(ejecutar.lista_parametro[i].id, _instruccion.lista_valores[i], ejecutar.lista_parametro[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)                
                if (mensaje != null) {
                    error = true
                    cadena += mensaje + '\n'
                    
                }
            }
            if (error) {
                return cadena
            }
            
            
            var ejecutar = Bloque(ejecutar.instrucciones, nuevoAmbito)
            var mensaje = ejecutar.cadena
            
            if (ejecutar.hayBreak) {
                mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
            }
            
            return mensaje
        }
        else {
            return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
    } else {
        //console.log(ejecutar)
        var ejecutar = Bloque(ejecutar.instrucciones, nuevoAmbito)
        var mensaje = ejecutar.cadena
        if (ejecutar.hayBreak) {
            mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
        }
        
        return mensaje
    }


}

module.exports = Ejecutar