class Metodo{
    constructor(_id, _tipoSimbolo, _lista_parametro,_instrucciones,_linea,_columna){
        this.id = _id;
        this.tipoSimbolo = _tipoSimbolo;
        this.lista_parametro = _lista_parametro;
        this.instrucciones = _instrucciones;
        this.linea = _linea;
        this.columna = _columna;
    }
}
module.exports = Metodo