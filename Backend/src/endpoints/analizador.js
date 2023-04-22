const Ambito = require("../controladores/Ambito/Ambito")
const TASimbolos = require("../controladores/Instruccion/TSimbolos")
const Global = require("../controladores/Instruccion/Global")


module.exports = (parser, app) => {

    app.post('/analizar', (req, res) => {        
        var prueba = req.body.entrada.toLowerCase()    
        //console.log(prueba)   
        var ast = parser.parse(prueba)        
        const AmbitoGlobal= new Ambito(null,"Global") 
        var resultado
        if (ast.err === "") {
            var cadena = Global(ast, AmbitoGlobal)         
            var simbolos = []
            var cont = 0
            for (let i = 0; i < TASimbolos.TabSimbolos.length; i++) {
                const simbolo = TASimbolos.TabSimbolos[i];
                //console.log(simbolo.identificador, simbolo.tipoVar);
                 for (let temp of simbolos) {                    
                    if (simbolo.identificador === temp.identificador &&
                        simbolo.entorno === temp.entorno) {
                        cont += 1
                        if (cont > 0) {
                            break
                        }
                    }
                }
                if (cont === 0) {
                    simbolos.push(simbolo)
                }
            }
            var resultado = {
                arbol: ast,
                resultado: cadena,
                tabSimbolos: simbolos,
                errores:""
            }
            
        }        
        
        res.send(resultado)
        TASimbolos.TabSimbolos.splice(0, TASimbolos.TabSimbolos.length);
        

        
    })

}