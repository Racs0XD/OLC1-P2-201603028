const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Operacion = require("../Operaciones/Operacion")
const Return = require("./Return");

function EjecutarFuncion(_instruccion, _ambito) {
    //console.log(_instruccion)
    // console.log("*************************************")
    // console.log(_instruccion)
    // console.log("*************************************")
    
    var cadena = ""
    var ejecutar;
    var funcionEjecutar = _ambito.getFuncion(_instruccion.nombre)

    // console.log("====================================")
    // console.log(funcionEjecutar)
    // console.log("====================================")



    if (funcionEjecutar != null) {
        ejecutar = funcionEjecutar
    } else {
        return `Error: El método o la función ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }

    var nuevoAmbito = new Ambito(_ambito)
    
    if (ejecutar.lista_parametros != null) {

        
        if (_instruccion.lista_valores != null && ejecutar.lista_parametros.length == _instruccion.lista_valores.length) {
            
            var error = false;

            for (let i = 0; i < ejecutar.lista_parametros.length; i++) {
                var declaracionAsignacion = Instruccion.nuevaDeclaracion(ejecutar.lista_parametros[i].id, _instruccion.lista_valores[i], ejecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                //console.log(declaracionAsignacion)
                var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                //console.log(mensaje)
                if (mensaje != null) {
                    error = true
                    cadena += mensaje + '\n'

                }
            }
            if (error) {
                return cadena
            }


            var ejecuta = Bloque(ejecutar.instrucciones, nuevoAmbito)
            //console.log(ejecuta)
            var mensaje = ejecuta.cadena
            for (let i = 0; i < ejecutar.instrucciones.length; i++) {
                if (ejecutar.instrucciones[i].instrucciones != undefined) {

                    if (ejecutar.instrucciones[i].instrucciones[0].tipo == 'RETURN') {
                        //console.log(ejecutar.instrucciones[i].retorno)                                             
                    }
                } else if (ejecutar.instrucciones[i].tipo == 'RETURN') {

                    if (ejecutar.instrucciones[i].retorno.tipo == TIPO_VALOR.IDENTIFICADOR) {
                        mensaje = Operacion(ejecutar.instrucciones[i].retorno, nuevoAmbito)
                    } else {
                        var val = nuevoAmbito.getSimbolo(ejecutar.lista_parametros[0].id)
                        //console.log(Operacion(_instruccion.lista_valores[0], nuevoAmbito))
                        //console.log(ejecutar.instrucciones)
                        //console.log((Bloque(ejecutar.instrucciones, nuevoAmbito)))

                        var val1 = Bloque(ejecutar.instrucciones, nuevoAmbito)
                        return {
                            valor: val1.cadena,
                            tipo: val.tipo,
                            linea: val.linea,
                            columna: val.columna,
                        }
                    }
                    
                }

            }







            //console.log(ejecuta)
            //console.log(Operacion(ejecutar.instrucciones[0], nuevoAmbito))    


            if (ejecuta.hayBreak) {
                mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
            }
            //console.log(mensaje)
            return mensaje
        } else {
            return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
    } else {
        //console.log(ejecutar)
        var ejecuta = Bloque(ejecutar.instrucciones, nuevoAmbito)
        var mensaje = ejecuta.cadena

        if (ejecuta.hayBreak) {
            mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
        }

        return mensaje
    }


}

module.exports = EjecutarFuncion