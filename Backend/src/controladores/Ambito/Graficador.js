const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")

class Graficador {
    constructor(_raiz) {
        this.grafo = ""
        this.contador = 0
        this.raiz = _raiz
    }

    graficar() {
        this.grafo = "digraph G {\n"
        this.grafo += "node [shape=\"box\"]"
        this.grafo += "Nodo0[label=\"RAIZ\"];\n"
        this.contador = 1
        this.recorrerAST("Nodo0", this.raiz)
        this.grafo += "}"
        return this.grafo
    }

    recorrerAST(_padre, _hijo) {
        _hijo.LIns.forEach(instruccion => {
            if (instruccion) {
                //console.log(instruccion, "instrucciona al inicio del recorrerAST")
                if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"DECLARACION\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarDeclaracion(instruccion, nombreHijo)
                } else if (instruccion.tipo === TIPO_INSTRUCCION.MAIN) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"MAIN\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarMain(instruccion, nombreHijo)
                } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"DEC_METODO\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarMetodo(instruccion, nombreHijo)
                } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_FUNCION) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"DEC_FUNCION\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarFuncion(instruccion, nombreHijo)
                } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_FUNCION) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"DEC_FUNCION\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarFuncion(instruccion, nombreHijo)
                } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"ASIGNACION\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarAsignacion(instruccion, nombreHijo)
                } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_VECTOR) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"DEC_VECTOR\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarDecVector(instruccion, nombreHijo)

                } else if (instruccion.tipo === TIPO_INSTRUCCION.AS_VECTOR) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"ASIG_VECTOR\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarASVector(instruccion, nombreHijo)

                } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_LISTA) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"DEC_LISTA\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarDecLista(instruccion, nombreHijo)

                } else if (instruccion.tipo === TIPO_INSTRUCCION.ADD_LISTA) {
                    var nombreHijo = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo + "[label=\"ADD_LISTA\"];\n"
                    this.grafo += _padre + "->" + nombreHijo + ";\n"
                    this.graficarAddLista(instruccion, nombreHijo)
                }

                //vectores
                //listas
            }        //funciones (print, length, truncate, round, typeof, toString, toCharArray)
        });


    }

    recorrerInstrucciones(_padre, _hijo) {
        _hijo.forEach(instruccion => {
            //console.log(instruccion, "instrucciona al inicio del recorrerInstrucciones")
            if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DECLARACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDeclaracion(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ASIGNACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarAsignacion(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"LLAMADA_METODO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarLlamadaMetodo(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"LLAMADA_FUNCION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarLlamadaFuncion(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"Print\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                //verificación de if, while, for, switch o sea haces uno de graficarOperacion cono el de tipoinstrucción print pero para todos los demás
            } else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instrucciones)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.IFE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ELSE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesIf)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesElse)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.ELSEIF) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ELSE IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesElseIf)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.IFEIF) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"IF ELSE-IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
                this.recorrerInstrucciones(nombreHijo, instruccion.instruccionesElse)
                this.recorrerInstrucciones(nombreHijo, instruccion.lista_elseif)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"SWITCH\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarSWITCH(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.CASE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"CASE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarCASE(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"WHILE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarWhile(instruccion, nombreHijo)
            }else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DO WHILE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDoWhile(instruccion, nombreHijo)                

            } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"FOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"           
                this.graficarFor(instruccion, nombreHijo)



            } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ASIGNACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarAsignacion(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_VECTOR) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DEC_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDecVector(instruccion, nombreHijo)

            } else if (instruccion.tipo === TIPO_INSTRUCCION.AS_VECTOR) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ASIG_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarASVector(instruccion, nombreHijo)

            } else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_LISTA) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DEC_LISTA\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDecLista(instruccion, nombreHijo)
            } else if (instruccion.tipo === TIPO_INSTRUCCION.ADD_LISTA) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ADD_LISTA\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarAddLista(instruccion, nombreHijo)
            }

        });
    }

    graficarSWITCH(_instruccion, _padre) {       
        if (_instruccion.expresion != null) {
            var expresion = `Nodo${this.contador}`
            this.grafo += expresion + `[label=\"EXPRESION\"];\n`;
            this.grafo += _padre + "->" + expresion + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.expresion, expresion)
        }      
        if (_instruccion.lista_case != null) {
            var actuali = `Nodo${this.contador}`
            this.grafo += actuali + `[label=\"INSTRUCCIONES\"];\n`;
            this.grafo += _padre + "->" + actuali + ";\n"
            this.contador++;
            this.recorrerInstrucciones(actuali, _instruccion.lista_case)
        }

    }

    graficarCASE(_instruccion, _padre) {          
        if (_instruccion.expresion != null) {
            var expresion = `Nodo${this.contador}`
            this.grafo += expresion + `[label=\"EXPRESION\"];\n`;
            this.grafo += _padre + "->" + expresion + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.expresion, expresion)
        }      
        if (_instruccion.instruccionesCase != null) {
            var actuali = `Nodo${this.contador}`
            this.grafo += actuali + `[label=\"INSTRUCCIONES CASE\"];\n`;
            this.grafo += _padre + "->" + actuali + ";\n"
            this.contador++;
            this.recorrerInstrucciones(actuali, _instruccion.instruccionesCase)
        }

    }

    graficarFor(_instruccion, _padre) {
        
        if (_instruccion.expresion != null) {
            var expresion = `Nodo${this.contador}`
            this.grafo += expresion + `[label=\"EXPRESION\"];\n`;
            this.grafo += _padre + "->" + expresion + ";\n"
            this.contador++;
            this.recorrerInstrucciones(expresion, [_instruccion.expresion])
        }
        if (_instruccion.condicion != null) {
            var condicion = `Nodo${this.contador}`
            this.grafo += condicion + `[label=\"CONDICION\"];\n`;
            this.grafo += _padre + "->" + condicion + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.condicion, condicion)
        }
        if (_instruccion.actualizacion != null) {
            var actuali = `Nodo${this.contador}`
            this.grafo += actuali + `[label=\"ACTUALIZACIÓN\"];\n`;
            this.grafo += _padre + "->" + actuali + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.actualizacion, actuali)
        }
        if (_instruccion.instrucciones != null) {
            var actuali = `Nodo${this.contador}`
            this.grafo += actuali + `[label=\"INSTRUCCIONES\"];\n`;
            this.grafo += _padre + "->" + actuali + ";\n"
            this.contador++;
            this.recorrerInstrucciones(actuali, _instruccion.instrucciones)
        }

    }

    graficarWhile(_instruccion, _padre) {             
        if (_instruccion.expresion != null) {
            var expresion = `Nodo${this.contador}`
            this.grafo += expresion + `[label=\"CONDICION\"];\n`;
            this.grafo += _padre + "->" + expresion + ";\n"
            this.contador++;
            console.log(_instruccion.expresion)
            this.graficarOperacion(_instruccion.expresion, expresion)
        }      
        if (_instruccion.instrucciones != null) {
            var actuali = `Nodo${this.contador}`
            this.grafo += actuali + `[label=\"INSTRUCCIONES\"];\n`;
            this.grafo += _padre + "->" + actuali + ";\n"
            this.contador++;
            this.recorrerInstrucciones(actuali, _instruccion.instrucciones)
        }

    }

    graficarDoWhile(_instruccion, _padre) {
        if (_instruccion.instrucciones != null) {
            var actuali = `Nodo${this.contador}`
            this.grafo += actuali + `[label=\"INSTRUCCIONES DO\"];\n`;
            this.grafo += _padre + "->" + actuali + ";\n"
            this.contador++;
            this.recorrerInstrucciones(actuali, _instruccion.instrucciones)
        }
        if (_instruccion.expresion != null) {
            var expresion = `Nodo${this.contador}`
            this.grafo += expresion + `[label=\"WHILE CONDICIONES\"];\n`;
            this.grafo += _padre + "->" + expresion + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.expresion, expresion)
        }      

    }

    graficarDeclaracion(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"TIPO\n ${_instruccion.tipo_dato}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n";
        this.contador++;
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"ID\n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n";
        this.contador++;
        if (_instruccion.valor != null) {
            this.graficarOperacion(_instruccion.valor, _padre)
        }
    }

    graficarOperacion(_expresion, _padre) {
        if(_expresion != null){
        if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
            _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR) {
            //console.log(_expresion.tipo, "valor")
            //console.log(_expresion, "expresion")
            var exp = _expresion.valor.toString()
            exp = exp.replace(/\"/gi, '\\\"') //reemplaza las comillas dobles por \"
            var value = `Nodo${this.contador}`
            this.grafo += value + `[label=\"${_expresion.tipo}\n ${exp}\"];\n`;
            this.grafo += _padre + "->" + value + ";\n";
            this.contador++;
        }
        else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||
            _expresion.tipo === TIPO_OPERACION.DIVISION || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO ||
            _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL ||
            _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
            _expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT) {
            var value = `Nodo${this.contador}`
            this.grafo += value + `[label=\"${_expresion.tipo}\n ${this.getSimbolo(_expresion.tipo)}\"];\n`;
            this.grafo += _padre + "->" + value + ";\n";
            this.contador++;
            this.graficarOperacion(_expresion.opIzq, value)
            this.graficarOperacion(_expresion.opDer, value)

        } else if (_expresion.tipo === TIPO_INSTRUCCION.INCREMENTO || _expresion.tipo === TIPO_INSTRUCCION.DECREMENTO) {
            var value = `Nodo${this.contador}`
            this.grafo += value + `[label=\"${_expresion.tipo}\n ${_expresion.id+this.getSimbolo(_expresion.tipo)}\"];\n`;
            this.grafo += _padre + "->" + value + ";\n";
            this.contador++;
            
        } else if (_expresion.tipo === TIPO_OPERACION.UNARIA) {
            var value = `Nodo${this.contador}`
            this.grafo += value + `[label=\"${_expresion.tipo}\n ${this.getSimbolo(_expresion.tipo)}\"];\n`;
            this.grafo += _padre + "->" + value + ";\n";
            this.contador++;
            this.graficarOperacion(_expresion.opDer, value)
        } else if (_expresion.tipo === TIPO_VALOR.VECTOR) {
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label=\" ${_expresion.tipo}\"];\n`;
            this.grafo += _padre + "->" + value + ";\n"
            this.contador++;
            var value2 = `Nodo${this.contador}`;
            this.grafo += value2 + `[label=\"IDENTIFICADOR ${_expresion.valor}\"];\n`;
            this.grafo += value + "->" + value2 + ";\n"
            this.contador++;
            var indice = `Nodo${this.contador}`;
            this.grafo += indice + `[label=\"INDICE \"];\n`;
            this.grafo += value + "->" + indice + ";\n"
            this.contador++;
            this.graficarOperacion(_expresion.indice, indice)
        } else if (_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
            var nombreHijo = "Nodo" + this.contador
            this.contador++;
            this.grafo += nombreHijo + "[label=\"LLAMADA_METODO\"];\n"
            this.grafo += _padre + "->" + nombreHijo + ";\n"
            this.graficarLlamadaMetodo(_expresion, nombreHijo)
        } else if (_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNCION) {
            var nombreHijo = "Nodo" + this.contador
            this.contador++;
            this.grafo += nombreHijo + "[label=\"LLAMADA_FUNCION\"];\n"
            this.grafo += _padre + "->" + nombreHijo + ";\n"
            this.graficarLlamadaFuncion(_expresion, nombreHijo)
        }}
    }
    getSimbolo(_tipo) {
        switch (_tipo) {
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
            case TIPO_INSTRUCCION.INCREMENTO:
                return "++"
            case TIPO_INSTRUCCION.DECREMENTO:
                return "--"
        }
    }

    graficarMain(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"LLAMADA \n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n";
        this.contador++;
        if (_instruccion.lista_valores != null) {//parametros alv falta hacerlo
            var parametro = `Nodo${this.contador}`
            this.grafo += parametro + `[label=\"PARAMETROS\"];\n`;
            this.grafo += _padre + "->" + parametro + ";\n";
            this.contador++;
            for (let i = 0; i < _instruccion.lista_valores.length; i++) {
                this.graficarOperacion(_instruccion.lista_valores[i], parametro)
            }
        }
    }

    graficarLlamadaMetodo(_instruccion, _padre) {
        var nombreMetodo = `Nodo${this.contador}`
        this.grafo += nombreMetodo + `[label=\"IDENTIFICADOR \n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + nombreMetodo + ";\n"
        this.contador++;
        if (_instruccion.lista_valores != null) {
            var parametro = `Nodo${this.contador}`
            this.grafo += parametro + `[label=\"PARAMETROS\"];\n`;
            this.grafo += _padre + "->" + parametro + ";\n";
            this.contador++;
            for (let i = 0; i < _instruccion.lista_valores.length; i++) {
                this.graficarOperacion(_instruccion.lista_valores[i], parametro)
            }
        }
    }

    graficarLlamadaFuncion(_instruccion, _padre) {
        //console.log(_instruccion)
        var nombreMetodo = `Nodo${this.contador}`
        this.grafo += nombreMetodo + `[label=\"IDENTIFICADOR \n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + nombreMetodo + ";\n"
        this.contador++;
        if (_instruccion.lista_valores != null) {
            var parametro = `Nodo${this.contador}`
            this.grafo += parametro + `[label=\"PARAMETROS\"];\n`;
            this.grafo += _padre + "->" + parametro + ";\n";
            this.contador++;
            for (let i = 0; i < _instruccion.lista_valores.length; i++) {
                this.graficarOperacion(_instruccion.lista_valores[i], parametro)
            }
        }
    }

    graficarAsignacion(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"ASIGNACION\n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n";
        this.contador++;
        this.graficarOperacion(_instruccion, _padre)
    }

    graficarMetodo(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"METODO\n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n";
        this.contador++;
        if (_instruccion.lista_parametros != null) {
            var parametro = `Nodo${this.contador}`
            this.grafo += parametro + `[label=\"PARAMETROS\"];\n`;
            this.grafo += _padre + "->" + parametro + ";\n";
            this.contador++;
            for (let i = 0; i < _instruccion.lista_parametros.length; i++) {
                this.graficarDeclaracion(_instruccion.lista_parametros[i], parametro) //para graficar los parametros de un metodo
            }
        }
        var instruccion = `Nodo${this.contador}`
        this.grafo += instruccion + `[label=\"INSTRUCCIONES\"];\n`;
        this.grafo += _padre + "->" + instruccion + ";\n";
        this.contador++;
        this.recorrerInstrucciones(instruccion, _instruccion.instrucciones)
    }

    graficarFuncion(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"FUNCION\n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n";
        this.contador++;
        if (_instruccion.lista_parametros != null) {
            var parametro = `Nodo${this.contador}`
            this.grafo += parametro + `[label=\"PARAMETROS\"];\n`;
            this.grafo += _padre + "->" + parametro + ";\n";
            this.contador++;
            for (let i = 0; i < _instruccion.lista_parametros.length; i++) {
                this.graficarDeclaracion(_instruccion.lista_parametros[i], parametro) //para graficar los parametros de la función
            }
        }
        var instruccion = `Nodo${this.contador}`
        this.grafo += instruccion + `[label=\"INSTRUCCIONES\"];\n`;
        this.grafo += _padre + "->" + instruccion + ";\n";
        this.contador++;
        this.recorrerInstrucciones(instruccion, _instruccion.instrucciones)
    }

    graficarDecVector(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"TIPO \n ${_instruccion.tipov}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;
        var tamanio = `Nodo${this.contador}`
        this.grafo += tamanio + `[label=\"TAMAÑO \"];\n`;
        this.grafo += _padre + "->" + tamanio + ";\n"
        this.contador++;
        this.graficarOperacion(_instruccion.valor, tamanio)
    }

    graficarASVector(_instruccion, _padre) {
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"POSICION \"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;
        this.graficarOperacion(_instruccion.indice, tipoVar)
        if (_instruccion.valor != null) {
            var tipoVar2 = `Nodo${this.contador}`
            this.grafo += tipoVar2 + `[label=\"EXPRESION\"];\n`;
            this.grafo += _padre + "->" + tipoVar2 + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.valor, tipoVar2)
        }
    }

    graficarDecLista(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"TIPO \n ${_instruccion.tipov}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;
        var tipoVar2 = `Nodo${this.contador}`
        this.grafo += tipoVar2 + `[label=\"NEW TIPO \n ${_instruccion.tipov2}\"];\n`;
        this.grafo += _padre + "->" + tipoVar2 + ";\n"
        this.contador++;
    }
    graficarAddLista(_instruccion, _padre) {
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;
        if (_instruccion.expresion != null) {
            var tipoVar2 = `Nodo${this.contador}`
            this.grafo += tipoVar2 + `[label=\"EXPRESION\"];\n`;
            this.grafo += _padre + "->" + tipoVar2 + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.expresion, tipoVar2)
        }
    }

}

module.exports = Graficador;
