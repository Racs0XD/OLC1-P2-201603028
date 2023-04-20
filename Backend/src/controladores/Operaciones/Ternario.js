const TIPO_DATO = require("../Enums/TipoDato");

function Ternario(_instruccion, _ambito,_Error, _entorno,Simbol){
    const c=_instruccion.expresion
    const v=_instruccion.verdadero
    const f=_instruccion.falso
    const Operacion = require("../Operaciones/Operacion")
    const condicion = Operacion(c, _ambito,_Error,"Ope. ternario",Simbol)
    if(condicion.tipo=== TIPO_DATO.BOOL){
        var r_valor, r_tipo
        if(condicion.valor){
            const verdadero = Operacion(v, _ambito,_Error,"Ope. ternario",Simbol)
            r_valor = verdadero.valor
            r_tipo= verdadero.tipo
        }else{
            const falso = Operacion(f, _ambito,_Error,"Ope. ternario",Simbol)
            r_valor = falso.valor
            r_tipo= falso.tipo
        }
        return {
            valor: r_valor,
            tipo: r_tipo,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    return{
        valor: `Error semántico: La condición no es de tipo BOOL, es: ${condicion.tipo}... Linea: ${_instruccion.linea} Columna: ${_instruccion.linea}`,
        tipo: null,
        linea: _instruccion.linea,
        columna: _instruccion.columna
    }
}

module.exports = Ternario