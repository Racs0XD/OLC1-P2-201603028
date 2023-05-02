const Ambito = require("../controladores/Ambito/Ambito")
const TASimbolos = require("../controladores/Instruccion/TSimbolos")
const Global = require("../controladores/Instruccion/Global")
const Graficador = require("../controladores/Ambito/Graficador")
var fs = require('fs')


module.exports = (parser, app) => {

    app.post('/analizar', (req, res) => {
        var prueba = req.body.entrada
        var ast = parser.parse(prueba)
        var grafica = new Graficador(ast)
        const AmbitoGlobal = new Ambito(null, "Global")
        var resultado
        if (ast.err === "") {
            var cadena = Global(ast, AmbitoGlobal)
            var simbolos = []
            var cont = 0
            //=================================================================================================
            //======================================== TABLA DE SIMBOLOS ======================================
            //=================================================================================================
            for (let i = 0; i < TASimbolos.TabSimbolos.length; i++) {
                const simbolo = TASimbolos.TabSimbolos[i];
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
            //=================================================================================================
            //=========================================== GRAFICAR AST ========================================
            //=================================================================================================
            dot = grafica.graficar()

            fs.writeFile('./src/controladores/AST/AST.dot', dot, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Archivo creado");
                }
            });
            const { exec } = require('child_process');
            exec('dot -Tpng ./src/controladores/AST/AST.dot -o ./src/controladores/AST/AST.png', (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    res.send(error.message)
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
            });
            // Leer la imagen generada
            const imagen = fs.readFileSync('./src/controladores/AST/AST.png');
            // Convertir la imagen a base64
            const imagenBase64 = Buffer.from(imagen).toString('base64');
            //=================================================================================================
            //====================================== Agrupando Resultado ======================================
            //=================================================================================================

            var resultado = {
                arbol: imagenBase64,
                resultado: cadena,
                tabSimbolos: simbolos,
                errores: ""
            }

        } else {
            //=================================================================================================
            //========================================== Retorno Error ========================================
            //=================================================================================================
            var resultado = {
                arbol: ast,
                resultado: ast.err,
                tabSimbolos: [],
                errores: ast.err
            }
        }
        //=================================================================================================
        //======================================== Enviand Resultado ======================================
        //=================================================================================================
        res.send(resultado)
        TASimbolos.TabSimbolos.splice(0, TASimbolos.TabSimbolos.length);



    })
}