const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");

function Declaracionlista(_instruccion, _ambito){
    if(_instruccion.tipov === TIPO_DATO.DECIMAL){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

            var nuevoarreglo = new Array();

            const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)    
    }

    else {
        return "\n Error: No es posible declarar la lista ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    
    return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.ENTERO){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

            var nuevoarreglo = new Array();

            const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo) 
    }

    else {
        return "\n Error: No es posible declarar la lista ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    
    return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.CADENA){
        //console.log("decimal")
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

            var nuevoarreglo = new Array();

            const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo) 
    }

    else {
        return "\n Error: No es posible declarar la lista ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    
    return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.BOOL){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

            var nuevoarreglo = new Array();

            const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.BOOL, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)   
    }

    else {
        return "\n Error: No es posible declarar la lista ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    
    return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.CHAR){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

            var nuevoarreglo = new Array();

            const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.CHAR, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
    }

    else {
        return "\n Error: No es posible declarar la lista ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    
    return null
        
    }

}

module.exports = Declaracionlista