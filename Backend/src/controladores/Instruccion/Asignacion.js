const Operacion = require("../Operaciones/Operacion");

function Asignacion(_instruccion,_ambito){
    const id=_instruccion.id;
    const existe= _ambito.existeSimbolo(id);
    if(existe){
        var valor=Operacion(_instruccion.expresion,_ambito)
        var simbolo=_ambito.getSimbolo(id);  
        var tipos={
            tipoSimbolo:simbolo.tipo,  
            tipoNuevoValor:valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){ //int a = 5
            simbolo.valor=valor.valor;
            _ambito.actualizar(id,simbolo);
            return null
        }else if(tipos.tipoSimbolo==='DECIMAL'  && tipos.tipoNuevoValor === 'ENTERO'){
            simbolo.valor = valor.valor + 0.0
            _ambito.actualizar(id,simbolo)
            return null
        }
        return "\n Error: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la variable \n'"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    
    }else{
        return "La variable " + id + " no existe Linea: " + _instruccion.linea + " columna: " + _instruccion.columna;

    }
}
module.exports = Asignacion