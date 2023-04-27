const Operacion = require("../Operaciones/Operacion");

function Actualizarlista(_instruccion, _ambito){
    
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var valor = Operacion(_instruccion.valor, _ambito)
        var indice = Operacion(_instruccion.expresion, _ambito)
        var simbolo = _ambito.getSimbolo(id)
        var tipos = {
            tipoSimbolo: simbolo.tipo,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor && indice.tipo === 'ENTERO'){
            simbolo.valor[indice.valor] = valor.valor
            _ambito.actualizar(id,simbolo)
            return null
        }
        return "\n Error: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la variable \n'"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    return `\n Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`

}

module.exports = Actualizarlista