const RTSimbolos = require("../Instruccion/TSimbolos");
class TablaSimbolos {
    constructor(identificador, tipoSimbolo, tipoVar, entorno, linea, columna) {
        this.identificador = identificador
        this.tipoSimbolo = tipoSimbolo
        this.tipoVar = tipoVar
        this.entorno = entorno
        this.linea = linea
        this.columna = columna
    }
  }

  function getEntornoString(ambitoActual) {
    let listaEntornos = []
    e = ambitoActual
    while (e != null) {
        listaEntornos.push(e.nombre)
        e = e.anterior
    }
    listaEntornos.reverse()
    return  (listaEntornos.length > 0)? listaEntornos.join("_") : listaEntornos.join("")
  }

class Ambito {

    constructor(_anterior, _actual) {   // new Ambito(null, "global")
        this.anterior = _anterior;
        this.nombre = _actual;
        this.tablaSimbolos = new Map();
        this.tablaMetodos = new Map();        
    }

    
    
    addSimbolo(_clave, _simbolo) { //agregar simbolo
        this.tablaSimbolos.set(_clave.toLowerCase(), _simbolo);
        let nTabla = new TablaSimbolos(
            _simbolo.id,
            _simbolo.tipoSimbolo,
            _simbolo.tipo,
            getEntornoString(this),
            _simbolo.linea,
            _simbolo.columna
        )
        RTSimbolos.TabSimbolos.push(nTabla)

    }
    getSimbolo(_clave) {  //retornar simbolo
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    existeSimbolo(_clave) {  //retornar simbolo
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if (encontrado != null) {
                return true
            }
        }
        return false
    }
    existeSimboloAmbitoActual(_clave) {  //retornar simbolo

        var encontrado = this.tablaSimbolos.get(_clave.toLowerCase())
        if (encontrado != null) {
            return true
        }
        return false
    }
    actualizar(_clave, _simbolo) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if (encontrado != null) {
                e.tablaSimbolos.set(_clave, _simbolo)
                return true;
            }

        }
        return false;
    }
    addMetodo(_s, _metodo) { //agregar metodo
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
        let nTabla = new TablaSimbolos(
            _metodo.id,
            _metodo.tipoSimbolo,
            _metodo.tipo,
            getEntornoString(this),
            _metodo.linea,
            _metodo.columna
        )
        RTSimbolos.TabSimbolos.push(nTabla)
    }
    getMetodo(_s) { //(hola, clase simbolo)
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    existeMetodo(_s) { //verificar si existe metodo
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_s.toLowerCase())
            if (encontrado != null) {
                return true
            }
        }
        return false
    }

}
module.exports = Ambito