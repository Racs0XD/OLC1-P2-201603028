const Ambito = require("../controladores/Ambito/Ambito")
const Global = require("../controladores/Instruccion/Global")

module.exports = (parser, app) => {
    var prueba = "";
    var ast;

    app.post('/analizar', (req, res) => {
        TablaSimbolos =  new Array();
        TablaErrores = new Array();
        ASTdiagrama = new Array();
        padre = "Nodo0";
        contador = 1;

        var prueba = req.body.entrada.toLowerCase()
        ASTdiagrama.push('Raiz')
        var ast = parser.parse(prueba)
        const AmbitoGlobal= new Ambito(null,"Global")
        var cadena =Global(ast, AmbitoGlobal)
     

        var resultado = {
            arbol: ast,
            resultado: cadena,
            simbolos: TablaSimbolos,
            errores: TablaErrores
        }
        res.send(resultado)

        var fs = require('fs')
        var logger = fs.createWriteStream('reporteast.dot', {
            //flags: 'a' // 'a' means appending (old data will be preserved)
        })

        logger.write("graph nombre_del_grafo {\n")
        logger.write("\"Nodo0\"[label=Raiz]; \n")
        for (var i = 1; i < ASTdiagrama.length; i++) {
            logger.write("\"" + ASTdiagrama[i][0] + "\"[label=\"" + ASTdiagrama[i][1] + "\"]; \n")
            logger.write("\"" + ASTdiagrama[i][2] + "\"--\"" + ASTdiagrama[i][0] + "\"; \n")
        }
        logger.write("}\n")
        logger.end() 

        const { exec } = require('child_process');
        exec(`dot -Tpng reporteast.dot -o reporteast.png`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        }

        );
        

    })

}