
function Incremento(_instruccion, _ambito){
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var simbolo = _ambito.getSimbolo(id)
        if(simbolo.tipo == 'ENTERO' || simbolo.tipo == 'DECIMAL'){
            simbolo.valor = simbolo.valor + 1
            _ambito.actualizar(id,simbolo)
            return null
        }
        return "\n Error: No es posible incrementar un valor de tipo "+ simbolo.tipo;
    }
    return `\n Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Incremento