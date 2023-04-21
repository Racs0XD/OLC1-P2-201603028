const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
const DecMetodo = require("./DecMetodo")
const Main = require("./Main")


function Global(_instrucciones, _ambito){
    let _ninstruccion = _instrucciones.LIns
    let errores = []
    var cadena = ""
    //1era pasada verficar que solo venga 1 main
    var contadorMain = 0;
    
    for (let i = 0; i < _ninstruccion.length; i++) {
        
       if(_ninstruccion[i].tipo == TIPO_INSTRUCCION.MAIN){
          contadorMain++;
       }
       
    }
    if(contadorMain>1){
        return "Solo puede haber 1 main"
    }else if(contadorMain==0){
        return "No hay main"
    }
    // 2da pasada vamos a declarar las variables metodos funciones y asignarles su valor
    for (let i = 0; i < _ninstruccion.length; i++) {
        
        if(_ninstruccion[i].tipo===TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(_ninstruccion[i],_ambito)
            if(mensaje!=null){
               cadena+= mensaje+ "\n"
            }
        }else if(_ninstruccion[i].tipo===TIPO_INSTRUCCION.ASIGNACION){
            
            var mensaje = Asignacion(_ninstruccion[i],_ambito)
            if(mensaje!=null){
               cadena+= mensaje+ "\n"
            }
        }else if (_ninstruccion[i].tipo === TIPO_INSTRUCCION.DEC_METODO) {
            var mensaje = DecMetodo(_ninstruccion[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + "\n"
            }
        }

    }
    //3ra pasada ejecutar el main
    for (let i = 0; i < _ninstruccion.length; i++) {
        
        if(_ninstruccion[i].tipo===TIPO_INSTRUCCION.MAIN){
            var mensaje = Main(_ninstruccion[i],_ambito)
            //console.log(mensaje)
            if(mensaje!=null){
                cadena+= mensaje+ "\n"
        }
            break

        }

    }
    
    return cadena
}

module.exports=Global