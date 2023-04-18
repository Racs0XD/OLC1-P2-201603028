const Ambito = require("../controladores/Ambito/Ambito")
const Global = require("../controladores/Instruccion/Global")



module.exports=(parser, app)=>{

    var prueba;
    var ast;
    app.post('/analizar',(req,res)=>{
         prueba = req.body.entrada
             ast = parser.parse(prueba)
            //console.log(ast)
            const AmbitoGlobal= new Ambito(null,"Global")
            var cadena =Global(ast, AmbitoGlobal)

            var resultado= {
                arbol: ast,
                resultado:cadena

            }
           
            
            res.send(resultado)
        
    })
    
    
}