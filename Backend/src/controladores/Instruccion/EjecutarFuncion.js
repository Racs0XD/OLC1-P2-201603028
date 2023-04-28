const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")
const Operacion = require("../Operaciones/Operacion")

function EjecutarFuncion(_instruccion, _ambito) {
    //console.log(_instruccion)
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
    if (ejecutar.lista_parametros != null) {        
        if (_instruccion.lista_valores != null && ejecutar.lista_parametros.length == _instruccion.lista_valores.length) {            
            var error = false;
            for (let i = 0; i < ejecutar.lista_parametros.length; i++) {
                var declaracionAsignacion = Instruccion.nuevaDeclaracion(ejecutar.lista_parametros[i].id, _instruccion.lista_valores[i], ejecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                
                if (mensaje != null) {
                    error = true
                    cadena += mensaje + '\n'
                    
                }
            }
            if (error) {
                return cadena
            }
            
            
            var ejecuta = Bloque(ejecutar.instrucciones, nuevoAmbito)
            if(ejecuta.cReturn){
                for (let i = 0; i < ejecutar.instrucciones.length; i++) {
                    if(ejecutar.instrucciones[i].instrucciones != undefined){                        
                        if(ejecutar.instrucciones[i].instrucciones[0].tipo=='RETURN'){
                            //console.log(ejecutar.instrucciones[i].retorno)  
                             
                            if(ejecutar.instrucciones[i].instrucciones[0].retorno.tipo){
                                return Operacion(ejecutar.instrucciones[i].instrucciones[0].retorno, nuevoAmbito).valor
                            }
                            return Operacion(ejecutar.instrucciones[i].instrucciones[0].retorno, nuevoAmbito).valor                    
                        }
                        
                    }else if(ejecutar.instrucciones[i].tipo=='RETURN'){ 
                        //console.log(Operacion(ejecutar.instrucciones[i].retorno, nuevoAmbito)  )
                        return Operacion(ejecutar.instrucciones[i].retorno, nuevoAmbito).valor                    
                    }

                }
            }
            var mensaje = ejecuta.cadena
            
            if (ejecuta.hayBreak) {
                mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
            }
            
            return mensaje
        }
        else {
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