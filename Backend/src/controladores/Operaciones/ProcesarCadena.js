const Operacion = require("./Operacion")

function procesarCadena(_expresion, _ambito){
    //console.log(Operacion(_expresion, _ambito))
   // console.log(_expresion)
    return Operacion(_expresion, _ambito)
}
module.exports= procesarCadena