const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Print = require("./Print");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const SentenciaIf = require("./If");
const SentenciaIfElse = require("./IfElse");
const SentenciaIfElseIf = require("./IfElseIf");
const Switch = require("./Switch");
const While = require("./While");
const DoWhile = require("./DoWhile");
const For = require("./For");
const Incremento = require("./Incremento");
const Decremento = require("./Decremento");
const Declaracionvector = require("./DecVector")
const Asignacionvector = require("./AsVector")
const Declaracionlista = require("./DecLista")
const Asignacionlista = require("./AsLista")
const Actualizarlista = require("./ActualizarLista")
const Chararrayfuncion = require("./CharArray")

function Bloque(_instrucciones,_ambito){
    //console.log(_instrucciones)
    var cadena=""
    var cBreak = false;
    var cContinue = false;
    var cReturn = false;
    _instrucciones.forEach(instruccion => {
        if(cBreak){
            return{
                cBreak: cBreak,
                cadena: cadena
            }
        }
        if(cContinue){
            return{
                cContinue: cContinue,
                cadena: cadena
            }
        }
        if(cReturn){
            return{
                cReturn: cReturn,
                cadena: cadena
            }
        }
        if(instruccion.tipo===TIPO_INSTRUCCION.PRINT){
           cadena+=Print(instruccion,_ambito) + "\n"
        }else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(instruccion, _ambito)

            if (mensaje != null) {
                cadena += mensaje
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(instruccion, _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            const EjecutarMetodo = require("./Ejecutar");
            var mensaje = EjecutarMetodo(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION){
            const EjecutarFuncion = require("./EjecutarFuncion");
            var mensaje = EjecutarFuncion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_VECTOR){
            var mensaje = Declaracionvector(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.AS_VECTOR){
            var mensaje = Asignacionvector(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ADD_LISTA){
            var mensaje = Asignacionlista(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.SET_LISTA){
            var mensaje = Actualizarlista(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_LISTA){
            var mensaje = Declaracionlista(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.CHARARRAY){
            var mensaje = Chararrayfuncion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            var ejecutar = SentenciaIf(instruccion, _ambito)
            var mensaje = ejecutar.cadena
            cBreak = ejecutar.cBreak
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IFE){
            var ejecutar = SentenciaIfElse(instruccion, _ambito)
            var mensaje = ejecutar.cadena
            cBreak = ejecutar.cBreak
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IFEIF){           
            var ejecutar = SentenciaIfElseIf(instruccion, _ambito)
            var mensaje = ejecutar.cadena
            cBreak = ejecutar.cBreak
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            var ejecutar = Switch(instruccion, _ambito)
            var mensaje = ejecutar.cadena
            cBreak = false
            cContinue = ejecutar.cContinue
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var mensaje = While(instruccion, _ambito)
            cBreak = false
            cContinue = false
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            var mensaje = DoWhile(instruccion, _ambito)
            cBreak = false
            cContinue = false
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var mensaje = For(instruccion, _ambito)
            cBreak = false
            cContinue = false
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.INCREMENTO){
            var mensaje = Incremento(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.DECREMENTO){
            var mensaje = Decremento(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
            cBreak = true
            return {
                cBreak: cBreak,
                cadena: cadena
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
            cContinue = true
            return {
                cContinue: cContinue,
                cadena: cadena
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            cReturn = true
            return {
                cReturn: cReturn,
                cadena: cadena
            }
        }
    });
    return {
        cBreak: cBreak,
        cContinue: cContinue,
        cadena:cadena
    }

}
module.exports = Bloque