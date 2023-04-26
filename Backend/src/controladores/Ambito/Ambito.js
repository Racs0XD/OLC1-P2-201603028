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

    
    
    addSimbolo(_clave, _simbolo) {
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
    getSimbolo(_clave) {  
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    existeSimbolo(_clave) {  
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if (encontrado != null) {
                return true
            }
        }
        return false
    }
    existeSimboloAmbitoActual(_clave) { 
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
    addMetodo(_s, _metodo) { 
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
        let nTabla = new TablaSimbolos(
            _metodo.id,
            _metodo.tipoSimbolo,
            "VOID",
            getEntornoString(this),
            _metodo.linea,
            _metodo.columna
        )
        RTSimbolos.TabSimbolos.push(nTabla)
    }
    getMetodo(_s) { 
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_s.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    existeMetodo(_s) { 
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_s.toLowerCase())
            if (encontrado != null) {
                return true
            }
        }
        return false
    }

    addFuncion(_s, _funcion) {
        this.tablaFunciones.set(_s.toLowerCase(), _funcion)
        let nTabla = new TablaSimbolos(
            _funcion.id,
            _funcion.tipoSimbolo,
            "FUNCION",
            getEntornoString(this),
            _funcion.linea,
            _funcion.columna
        )
        RTSimbolos.TabSimbolos.push(nTabla)
    }

    getFuncion(_s) { 
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_s.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    
    existeFuncion(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_s.toLowerCase()) 
            if (encontrado != null) {
                return true
            }
        }
        return false
    }

}
module.exports = Ambito