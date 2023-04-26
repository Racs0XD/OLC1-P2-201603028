class Funcion {
    constructor(_tipo, _id, _tipoSimbolo, _lista_parametros, _instrucciones, _linea, _columna) {
        this.tipo = _tipo
        this.id = _id;
        this.tipoSimbolo = _tipoSimbolo;
        this.lista_parametros = _lista_parametros
        this.instrucciones = _instrucciones
        this.linea = _linea;
        this.columna = _columna
    }
}
module.exports = Funcion