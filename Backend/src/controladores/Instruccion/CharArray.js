const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function Chararrayfuncion(_instruccion, _ambito){

    if(_instruccion.tipov === TIPO_DATO.CHAR){
            valor = Operacion(_instruccion.expresion,_ambito)
            var nuevoarreglo = new Array();

            for(var i=0;i<valor.valor.length;i++){
                nuevoarreglo.push(valor.valor[i])
            }
            
            const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", nuevoarreglo, TIPO_DATO.CHAR, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
  
    return null
        
    }

    else {
        return "\n Error: No es posible declarar la lista ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }

}

module.exports = Chararrayfuncion