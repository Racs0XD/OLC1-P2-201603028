const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function Declaracionvector(_instruccion, _ambito){
    if(_instruccion.tipov === TIPO_DATO.DECIMAL){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

        if(_instruccion.valor != null){
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
                var nuevoarreglo = new Array();

                while(valor > 0){
                    nuevoarreglo.push("0")
                    valor--
                }

                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            }
            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        else {
            return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
        }
        
    }

        else {

            if(_instruccion.valor != null){
                var nuevoarreglo = new Array();

                for(var i =0; i < _instruccion.valor.length; i++){

                    op = Operacion(_instruccion.valor[i], _ambito)
                    tipo = op.tipo;
                    if(tipo === TIPO_DATO.DECIMAL){
                        valor = op.valor;
                        nuevoarreglo.push(valor.toString())
                    
                    }else {
                        return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
                    }
                }
                
    
                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                
            }

            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.ENTERO){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

        if(_instruccion.valor != null){
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
                var nuevoarreglo = new Array();

                while(valor > 0){
                    nuevoarreglo.push("0")
                    valor--
                }

                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            }
            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        else {
            return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
        }
        
    }

        else {

            if(_instruccion.valor != null){
                var nuevoarreglo = new Array();

                for(var i =0; i < _instruccion.valor.length; i++){

                    op = Operacion(_instruccion.valor[i], _ambito)
                    if(tipo === TIPO_DATO.ENTERO){
                        valor = op.valor;
                        nuevoarreglo.push(valor.toString())
                    
                    }else {
                        return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
                    }
                }
                
    
                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                
            }

            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.CADENA){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

        if(_instruccion.valor != null){
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
                var nuevoarreglo = new Array();

                while(valor > 0){
                    nuevoarreglo.push("0")
                    valor--
                }

                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            }
            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        else {
            return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
        }
        
    }

        else {

            if(_instruccion.valor != null){
                var nuevoarreglo = new Array();

                for(var i =0; i < _instruccion.valor.length; i++){

                    op = Operacion(_instruccion.valor[i], _ambito)
                    tipo = op.tipo;
                    if(tipo === TIPO_DATO.CADENA){
                        valor = op.valor;
                        nuevoarreglo.push(valor.toString())
                    
                    }else {
                        return "Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
                    }
                }
                
    
                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                
            }

            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.BOOL){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

        if(_instruccion.valor != null){
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
                var nuevoarreglo = new Array();

                while(valor > 0){
                    nuevoarreglo.push("0")
                    valor--
                }

                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.BOOL, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            }
            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        else {
            return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
        }
        
    }

        else {

            if(_instruccion.valor != null){
                var nuevoarreglo = new Array();

                for(var i =0; i < _instruccion.valor.length; i++){

                    op = Operacion(_instruccion.valor[i], _ambito)
                    tipo = op.tipo;
                    if(tipo === TIPO_DATO.BOOL){
                        valor = op.valor;
                        nuevoarreglo.push(valor.toString())
                    
                    }else {
                        return "Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
                    }
                }
                
    
                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.BOOL, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                
            }

            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        return null
        
    }

    else if(_instruccion.tipov === TIPO_DATO.CHAR){
        if(_instruccion.tipov2 !=null && _instruccion.tipov2 == _instruccion.tipov){

        if(_instruccion.valor != null){
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
                var nuevoarreglo = new Array();

                while(valor > 0){
                    nuevoarreglo.push("0")
                    valor--
                }

                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.CHAR, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            }
            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        else {
            return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
        }
        
    }

        else {

            if(_instruccion.valor != null){
                var nuevoarreglo = new Array();

                for(var i =0; i < _instruccion.valor.length; i++){

                    op = Operacion(_instruccion.valor[i], _ambito)
                    tipo = op.tipo;
                    if(tipo === TIPO_DATO.CHAR){
                        valor = op.valor;
                        nuevoarreglo.push(valor.toString())
                    
                    }else {
                        return "Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
                    }
                }
                
    
                const nuevoSimbolo = new Simbolo(_instruccion.id, "DEC_VARIABLE", nuevoarreglo, TIPO_DATO.CHAR, _instruccion.linea, _instruccion.columna)
                if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
                    return "\n Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
                }
                _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
                
            }

            else {
                return "\n Error: No es posible declarar el vector ... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        return null
        
    }

}

module.exports = Declaracionvector