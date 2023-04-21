class Simbolo{
    constructor(_id,_tipoSimbolo, _valor, _tipo, _linea, _columna){
        this.id = _id;
        this.tipoSimbolo = _tipoSimbolo;
        this.valor = _valor;
        this.tipo = _tipo;
        this.linea = _linea;
        this.columna = _columna;
    }
}
module.exports = Simbolo