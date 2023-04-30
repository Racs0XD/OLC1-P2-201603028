const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const TIPO_DATO = require("../Enums/TipoDato")
const OperacionesVarias = require("./Aritmetica_Logica_Relacional");
const Ternario = require("./Ternario");
const Cadenas = require("./Cadenas");
const ValorExpresion = require("./ValorExpresion");



function Operacion(_expresion, _ambito) {
    //console.log(_expresion)
    if(_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION){
        
        const EjecutarFuncion = require("../Instruccion/EjecutarFuncion")
        var mensaje = EjecutarFuncion(_expresion, _ambito)
        //console.log(mensaje)
        if(mensaje!=null){
            if(mensaje === ""){
                mensaje = "vacío"
                return {
                    valor:mensaje,
                    tipo:TIPO_DATO.CADENA
                } 
            } else {
                return {
                    valor:mensaje,
                    tipo:TIPO_DATO.CADENA
                } 
            }
              
        }
    } else if (_expresion.tipo === TIPO_VALOR.DECIMAL ||
        _expresion.tipo === TIPO_VALOR.BOOL ||
        _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA ||
        _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CHAR ||
        _expresion.tipo === TIPO_VALOR.VECTOR ||
        _expresion.tipo === TIPO_VALOR.LISTA ||
        _expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {            
        return ValorExpresion(_expresion, _ambito);
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA ||
        _expresion.tipo === TIPO_OPERACION.RESTA ||
        _expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||
        _expresion.tipo === TIPO_OPERACION.DIVISION ||
        _expresion.tipo === TIPO_OPERACION.POTENCIA ||
        _expresion.tipo === TIPO_OPERACION.MODULO ||
        _expresion.tipo === TIPO_OPERACION.UNARIA ||
        _expresion.tipo === TIPO_OPERACION.NEGACION||
        _expresion.tipo === TIPO_OPERACION.OR ||
        _expresion.tipo === TIPO_OPERACION.AND ||
        _expresion.tipo === TIPO_OPERACION.NOT ||
        _expresion.tipo === TIPO_OPERACION.IGUALIGUAL ||
        _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR ||
        _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR ||
        _expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return OperacionesVarias(_expresion, _ambito);
    } else if (_expresion.tipo === TIPO_OPERACION.TERNARIO) {
        return Ternario(_expresion, _ambito, _Error, _entorno, Simbol)
    } else if (_expresion.tipo === TIPO_OPERACION.TOUPPER ||
        _expresion.tipo === TIPO_OPERACION.TOLOWER ||
        _expresion.tipo === TIPO_OPERACION.LENGTH ||
        _expresion.tipo === TIPO_OPERACION.TRUNCATE ||
        _expresion.tipo === TIPO_OPERACION.ROUND ||
        _expresion.tipo === TIPO_OPERACION.TYPEOF ||
        _expresion.tipo === TIPO_OPERACION.TOSTRING) {
        return Cadenas(_expresion, _ambito)
    }

}
module.exports = Operacion