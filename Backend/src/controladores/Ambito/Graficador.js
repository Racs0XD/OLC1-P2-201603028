const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")

class Graficador {
    constructor(_raiz){
        this.grafo = ""
        this.contador = 0
        this.raiz = _raiz
    }

    graficar(){
        this.grafo = "digraph G {\n"
        this.grafo += "node [shape=\"box\"]"
        this.grafo += "Nodo0[label=\"RAIZ\"];\n"
        this.contador = 1
        this.recorrerAST("Nodo0", this.raiz)
        this.grafo += "}"
        return this.grafo
    }

    recorrerAST(_padre, _hijo){
        _hijo.LIns.forEach(instruccion => {
            if(instruccion){
            if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DECLARACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDeclaracion(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.MAIN){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"MAIN\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarMain(instruccion, nombreHijo)
            }
            
            else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DEC_METODO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarMetodo(instruccion, nombreHijo)
            } else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ASIGNACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarAsignacion(instruccion, nombreHijo)
            }

            //vectores
            //listas
                }        //funciones (print, length, truncate, round, typeof, toString, toCharArray)
        });

    
}

    recorrerInstrucciones(_padre, _hijo){
        _hijo.forEach(instruccion => {
            //console.log(instruccion.tipo, "instrucciona al inicio del recorrerInstrucciones")
            if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DECLARACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDeclaracion(instruccion, nombreHijo)
            }else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
                //console.log("entro al asignacion", instruccion.tipo)
                //console.log(instruccion, "instruccion asignacion")
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ASIGNACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarAsignacion(instruccion, nombreHijo)
            }else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"Print\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
            //verificación de if, while, for, switch o sea haces uno de graficarOperacion cono el de tipoinstrucción print pero para todos los demás
            }else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
                //console.log("entro al if")
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instrucciones)
            }else if(instruccion.tipo === TIPO_INSTRUCCION.IFCE){
                //console.log("entro al IFCE")
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ELSE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesIf)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesElse)
            }else if(instruccion.tipo === TIPO_INSTRUCCION.ELSEIF){
                //console.log("Entro al ELSEIF")
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ELSE IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesElseIf)
            }else if(instruccion.tipo === TIPO_INSTRUCCION.IFCEIF){
                //console.log(instruccion.instruccionesElse, "Entro al IFCEIF")
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"IF ELSE-IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                //this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesIf)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesElse)
                this.recorrerInstrucciones(nombreHijo, instruccion.lista_elseif)
            }else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
                ////console.log(instruccion.instrucciones, "expresion while1")
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"WHILE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                ////console.log(nombreHijo, "nombreHijo")
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instrucciones)
            } else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
                ////console.log(instruccion, "entro al DOWHILE")
                ////console.log(instruccion.instrucciones, "expresion DOWHILE")
                ////console.log(instruccion.expresionWhile, "expresionWhile DOWHILE")
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DO WHILE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                ////console.log(nombreHijo, "nombreHijo")
                this.graficarOperacion(instruccion.expresionWhile, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instrucciones)
            
            }
           
        });
        }
        
        graficarDeclaracion(_instruccion, _padre){
            var tipoVar = `Nodo${this.contador}`
            this.grafo += tipoVar + `[label=\"TIPO\n ${_instruccion.tipo_dato}\"];\n`;
            this.grafo += _padre + "->"  + tipoVar + ";\n" ;
            this.contador++;
            var nombreVar = `Nodo${this.contador}`
            this.grafo += nombreVar + `[label=\"ID\n ${_instruccion.id}\"];\n`;
            this.grafo += _padre + "->" + nombreVar + ";\n";
            this.contador++;
            if(_instruccion.valor != null){ 
                this.graficarOperacion(_instruccion.valor, _padre)
            }
        }

        graficarOperacion(_expresion, _padre){
            if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
                _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR){
                    //console.log(_expresion.tipo, "valor")
                    //console.log(_expresion, "expresion")
                    var exp = _expresion.valor.toString()
                    exp = exp.replace(/\"/gi, '\\\"') //reemplaza las comillas dobles por \"
                    var value = `Nodo${this.contador}`
                    this.grafo += value + `[label=\"${_expresion.tipo}\n ${exp}\"];\n`;
                    this.grafo += _padre + "->" + value + ";\n";
                    this.contador++;
                } 
            else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||
                    _expresion.tipo === TIPO_OPERACION.DIVISION || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO ||
                    _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL ||
                    _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
                    _expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT){
                        var value = `Nodo${this.contador}`
                        this.grafo += value + `[label=\"${_expresion.tipo}\n ${this.getSimbolo(_expresion.tipo)}\"];\n`; 
                        this.grafo += _padre + "->" + value + ";\n";
                        this.contador++;
                        this.graficarOperacion(_expresion.opIzq, value)
                        this.graficarOperacion(_expresion.opDer, value)
                        
                   }else if(_expresion.tipo === TIPO_OPERACION.UNARIA){
                        var value = `Nodo${this.contador}`
                        this.grafo += value + `[label=\"${_expresion.tipo}\n ${this.getSimbolo(_expresion.tipo)}\"];\n`; 
                        this.grafo += _padre + "->" + value + ";\n";
                        this.contador++;
                        this.graficarOperacion(_expresion.opDer, value)
                    }
                }
            getSimbolo(_tipo){
                switch(_tipo){
                    case TIPO_OPERACION.SUMA:
                        return "+"
                    case TIPO_OPERACION.RESTA:
                        return "-"
                    case TIPO_OPERACION.MULTIPLICACION:
                        return "*"
                    case TIPO_OPERACION.DIVISION:
                        return "/"
                    case TIPO_OPERACION.POTENCIA:
                        return "^"
                    case TIPO_OPERACION.MODULO:
                        return "%"
                    case TIPO_OPERACION.MAYOR:
                        return ">"
                    case TIPO_OPERACION.MENOR:
                        return "<"
                    case TIPO_OPERACION.MAYORIGUAL:
                        return ">="
                    case TIPO_OPERACION.MENORIGUAL:
                        return "<="
                    case TIPO_OPERACION.IGUALIGUAL:
                        return "=="
                    case TIPO_OPERACION.DIFERENTE:
                        return "!="
                    case TIPO_OPERACION.OR:
                        return "||"
                    case TIPO_OPERACION.AND:
                        return "&&"
                    case TIPO_OPERACION.NOT:
                        return "!"
                    case TIPO_OPERACION.UNARIA:
                        return "-"
                }
            }

            graficarMain(_instruccion, _padre){
                    var tipoVar = `Nodo${this.contador}`
                    this.grafo += tipoVar + `[label=\"LLAMADA \n ${_instruccion.nombre}\"];\n`;
                    this.grafo += _padre + "->"  + tipoVar + ";\n" ;
                    this.contador++;
                    if(_instruccion.lista_valores != null){//parametros alv falta hacerlo
                        var parametro = `Nodo${this.contador}`
                        this.grafo += parametro + `[label=\"PARAMETROS\"];\n`;
                        this.grafo += _padre + "->" + parametro + ";\n";
                        this.contador++;
                        for(let i = 0; i < _instruccion.lista_valores.length; i++){
                            this.graficarOperacion(_instruccion.lista_valores[i], parametro)
                        }
                    }
            }

            graficarAsignacion(_instruccion, _padre){
                var tipoVar = `Nodo${this.contador}`
                this.grafo += tipoVar + `[label=\"ASIGNACION\n ${_instruccion.id}\"];\n`;
                this.grafo += _padre + "->"  + tipoVar + ";\n" ;
                this.contador++;
                this.graficarOperacion(_instruccion, _padre)
            }

            graficarMetodo(_instruccion, _padre){
                var tipoVar = `Nodo${this.contador}`
                this.grafo += tipoVar + `[label=\"METODO\n ${_instruccion.nombre}\"];\n`;
                this.grafo += _padre + "->"  + tipoVar + ";\n" ;
                this.contador++;
                if(_instruccion.lista_parametros != null){
                    var parametro = `Nodo${this.contador}`
                    this.grafo += parametro + `[label=\"PARAMETROS\"];\n`;
                    this.grafo += _padre + "->"  + parametro + ";\n" ;
                    this.contador++;
                    for(let i = 0; i < _instruccion.lista_parametros.length; i++){
                        this.graficarDeclaracion(_instruccion.lista_parametros[i], parametro) //para graficar los parametros de un metodo
                    }
                }
                var instruccion = `Nodo${this.contador}`
                this.grafo += instruccion + `[label=\"INSTRUCCIONES\"];\n`;
                this.grafo += _padre + "->"  + instruccion + ";\n" ;
                this.contador++;
                this.recorrerInstrucciones(instruccion, _instruccion.instrucciones)
            }
}

module.exports = Graficador;
        