const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Print = require("./Print");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const SentenciaIf = require("./If");
const SentenciaIfElse = require("./IfElse");
const SentenciaIfElseIf = require("./IfElseIf");

function Bloque(_instrucciones,_ambito){
    var cadena=""
    var cBreak = false;
    
    _instrucciones.forEach(instruccion => {
        if(cBreak){
            return{
                cBreak: cBreak,
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
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IFCEIF){
            var ejec = SentenciaIfElseIf(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak = ejec.hayBreak
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
    });
    return {
        cBreak: cBreak,
        cadena:cadena
    }

}
module.exports = Bloque