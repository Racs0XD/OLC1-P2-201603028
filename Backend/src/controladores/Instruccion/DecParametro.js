const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function DecParametro(_instruccion, _ambito){
    //console.log(_instruccion)
    if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
        var valor = 0.0
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.DECIMAL){
                valor = op.valor;
            }
            else {
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", valor, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.ENTERO){        
        var valor = 0
        if(_instruccion.valor != null){            
            var op = Operacion(_instruccion.valor, _ambito)            
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
            } else if(tipo === TIPO_DATO.BOOL){
                valor = op.valor;
                if(valor == true){
                    valor = 1
                }
                if(valor == false){
                    valor = 0
                }
                
            } else {
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.ENTERO+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", valor, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)        
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
        var valor = ""
        if(_instruccion.valor!=null){
            op = Operacion(_instruccion.valor, _ambito)
            valor = String(op.valor)
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.BOOL){
        var valor = true
        if(_instruccion.valor!=null){
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo
            if(tipo===TIPO_DATO.BOOL){
                valor = Boolean(op.valor)
            }
            else{
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.BOOL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", valor, TIPO_DATO.BOOL, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if(_instruccion.tipo_dato === TIPO_DATO.CHAR){
        var valor = "\\u0000"
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.CHAR){
                valor = op.valor;
            }
            else {
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CHAR+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", valor, TIPO_DATO.CHAR, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if(_instruccion.tipo_dato === TIPO_DATO.LISTA){
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(Array.isArray(op.valor)){
                valor = op.valor;
            }
            else {
                "Error: No es posible asignar el valor a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.LISTA+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", valor, tipo, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if(_instruccion.tipo_dato === TIPO_DATO.VECTOR){
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            
            tipo = op.tipo;
            if(Array.isArray(op.valor)){
                valor = op.valor;
            }
            else {
                "Error: No es posible asignar el valor a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.VECTOR+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, "VARIABLE", valor, tipo, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

}

module.exports = DecParametro