/* lexical grammar */
%{
        const TIPO_OPERACION= require('../controladores/Enums/TipoOperacion');
        const TIPO_VALOR = require('../controladores/Enums/TipoValor');
        const TIPO_DATO= require('../controladores/Enums/TipoDato');
        const INSTRUCCION = require('../controladores/Instruccion/Instruccion');     

        let respuesta = {
                LIns: [],
                err: ""
        };
              
%}
%lex
%options case-insensitive
%%

\s+                   /* skip whitespace */
"//".*                 //comentario lineal
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas   

"int"                   return 'Rint'
"double"                return 'Rdouble'
"boolean"               return 'Rboolean'
"char"                  return 'Rchar'
"string"                return 'Rstring'
"if"                    return 'Rif'
"else"                  return 'Relse'
"switch"                return 'Rswitch'
"case"                  return 'Rcase'
"do"                    return 'Rdo'
"while"                 return 'Rwhile'
"for"                   return 'Rfor'
"break"                 return 'Rbreak'
"continue"              return 'Rcontinue'
"return"                return 'Rreturn'
"default"               return 'Rdefault'
"void"                  return 'Rvoid'
"print"                 return 'Rprint'
"true"                  return 'Rtrue'
"false"                 return 'Rfalse'
"main"                  return 'Rmain'

[0-9]+("."[0-9]+)\b    return 'decimal'
"."                     return 'punto'
[0-9]+\b                return 'entero'
"=="                   return 'igualigual'       
"!="                  return 'diferente'
"<="                    return 'menorIgual'
"<"                   return 'menor'
">="                  return 'mayorIgual'
"="                     return 'igual'
">"                   return 'mayor'
","                   return 'coma'
";"                   return 'ptcoma'
":"                   return 'dospuntos'
"||"                  return 'or'
"&&"                  return 'and'
"{"                   return 'llaveA'
"}"                   return 'llaveC'
"*"                   return 'multi'
"/"                   return 'div'
"--"                  return 'menosmenos'
"++"                  return 'masmas'   
"-"                   return 'menos'
"+"                   return 'suma'
"^"                   return 'exponente'
"!"                   return 'not'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
"["                   return 'corchA'
"]"                   return 'corchC'

([a-zA-Z])([a-zA-Z0-9_])*               return 'identificador'
["\""]([^"\""])*["\""]                  return 'string'
["\'"]([^"\'"])*["\'"]                  return 'char'

<<EOF>>               return 'EOF'
.                     { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex


/* operator associations and precedence */
%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'menor' 'menorIgual' 'mayor' 'mayorIgual' 'diferente'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo' 
%nonassoc 'exponente'
%left umenos 

%right 'incremento' 'decremento'

%start INICIO
%% /* language grammar */

INICIO:  OPCIONESCUERPO EOF {respuesta.err = ""; respuesta.LIns = $1; return respuesta;}
   // | error ptcoma         { respuesta.err  =  "Error Sintactico: "+ $$ + " Linea: "  + (this._$.first_line-1) + ", Columna: " + this._$.first_column ; return respuesta; }|
;


OPCIONESCUERPO: OPCIONESCUERPO CUERPO{$1.push($2); $$=$1;}
            |CUERPO {$$=[$1];}
;
CUERPO: DEC_VAR ptcoma {$$=$1;}                                           //DECLARACION DE CADA COMPONENTE DEL CUERPO DE MANERA RECURSIVA
        |ASIG_VAR ptcoma {$$=$1;}
        |METODOS {$$=$1;}
        |MAIN {$$=$1;}
;
METODOS: Rvoid identificador parA parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line,this._$.first_column+1)}
        
;

MAIN: Rmain identificador parA parC ptcoma {$$ = INSTRUCCION.nuevoMain($2, null, this._$.first_line,this._$.first_column+1)}
      
       
;
DEC_VAR: TIPO identificador  {$$= INSTRUCCION.nuevaDeclaracion($2,null, $1,this._$.first_line, this._$.first_column+1)}
        |TIPO identificador igual EXPRESION  {$$= INSTRUCCION.nuevaDeclaracion($2, $4, $1,this._$.first_line, this._$.first_column+1)}      
;

ASIG_VAR: identificador igual EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3,this._$.first_line, this._$.first_column+1)}        
;

TIPO: Rint{$$= TIPO_DATO.ENTERO}
    |Rdouble{$$= TIPO_DATO.DECIMAL}
    |Rchar {$$= TIPO_DATO.CHAR}
    |Rboolean{$$= TIPO_DATO.BOOL}
    |Rstring {$$= TIPO_DATO.CADENA}
;
INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$$ = $1; $1.push($2);}
            |INSTRUCCION {$$ = [$1];}
;

INSTRUCCION: DEC_VAR ptcoma {$$=$1}
        |ASIG_VAR ptcoma {$$=$1;}
        |PRINT {$$=$1;}
        |IF {$$=$1}
        |SWITCH {$$=$1}        
        |WHILE {$$=$1}
        |DOWHILE {$$=$1}
        |FOR {$$=$1}
        |BREAK {$$=$1}
        |CONTINUE {$$=$1}
        |RETURN {$$=$1}
;

PRINT: Rprint parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevoPrint($3, this._$.first_line,this._$.first_column+1)}
;

IF: Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = new INSTRUCCION.nuevoIf($3, $6 , this._$.first_line,this._$.first_column+1)}
        | Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC Relse llaveA INSTRUCCIONES llaveC {$$ = new INSTRUCCION.nuevoIfElse($3, $6, $10 , this._$.first_line,this._$.first_column+1)}
        | Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC ELSEIFS {$$ = new INSTRUCCION.nuevoIfElseIf($3, $6,$8,null,this._$.first_line, this._$.first_column+1)}
        | Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC ELSEIFS Relse llaveA INSTRUCCIONES llaveC {$$ = new INSTRUCCION.nuevoIfElseIf($3, $6,$8,$11,this._$.first_line, this._$.first_column+1)}
;

ELSEIFS: ELSEIFS CONELSEIF {$1.push($2); $$=$1}
    |CONELSEIF {$$=[$1];}
;

CONELSEIF: Relse Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = new INSTRUCCION.nuevoElseIf($4, $7,this._$.first_line, this._$.first_column+1)}
;

SWITCH: Rswitch parA EXPRESION parC llaveA CSWITCH DEF llaveC {$$= new INSTRUCCION.nuevoSwitch($3, $6, $7, this._$.first_line,this._$.first_column+1)}
      | Rswitch parA EXPRESION parC llaveA CSWITCH llaveC {$$= new INSTRUCCION.nuevoSwitch($3, $6, null, this._$.first_line,this._$.first_column+1)}
      | Rswitch parA EXPRESION parC llaveA DEF llaveC {$$= new INSTRUCCION.nuevoSwitch($3, null, $6, this._$.first_line,this._$.first_column+1)}
; 

CSWITCH: CSWITCH CONSWITCH {$1.push($2); $$=$1;}
            | CONSWITCH {$$=[$1];}
;

CONSWITCH: Rcase EXPRESION dospuntos INSTRUCCIONES {$$ = new INSTRUCCION.nuevoCase($2, $4 , this._$.first_line,this._$.first_column+1) }
;

DEF: Rdefault dospuntos INSTRUCCIONES {$$ = $3}
;

WHILE: Rwhile parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1)}
;

DOWHILE: Rdo llaveA INSTRUCCIONES llaveC Rwhile parA EXPRESION parC ptcoma {$$ = new INSTRUCCION.nuevoDoWhile($7, $3 , this._$.first_line,this._$.first_column+1)}
|Rdo llaveA llaveC Rwhile parA EXPRESION parC ptcoma {$$ = new INSTRUCCION.nuevoDoWhile($6, [] , this._$.first_line,(this._$.first_column+1));}
;

FOR: Rfor parA CUERPOFOR ptcoma EXPRESION ptcoma INSTRUCCIONFOR parC llaveA INSTRUCCIONES llaveC {$$ = new INSTRUCCION.nuevoFor($3, $5, $7, $10, this._$.first_line,this._$.first_column+1)}
| Rfor parA CUERPOFOR ptcoma EXPRESION ptcoma INSTRUCCIONFOR parC llaveA  llaveC {$$ = new INSTRUCCION.nuevoFor($3, $5, $7, $10, this._$.first_line,this._$.first_column+1)}
;

CUERPOFOR: DEC_VAR  {$$=$1;}                                          
        |ASIG_VAR  {$$=$1;}
;

INSTRUCCIONFOR: INCREMENTO {$$=$1}
        |DECREMENTO {$$=$1}
;
INCREMENTO: identificador masmas{$$= INSTRUCCION.nuevoIncremento($1,this._$.first_line,this._$.first_column+1)}
;

DECREMENTO: identificador menosmenos  {$$= INSTRUCCION.nuevoDecremento($1,this._$.first_line,this._$.first_column+1)}
;

BREAK: Rbreak ptcoma {$$ = new INSTRUCCION.nuevoBreak(this._$.first_line,this._$.first_column+1)}
;

CONTINUE: Rcontinue ptcoma {$$ = new INSTRUCCION.nuevoContinue(this._$.first_line,this._$.first_column+1)}
;

RETURN: Rreturn ptcoma {$$ = new INSTRUCCION.nuevoReturn(this._$.first_line,this._$.first_column+1)}
;

EXPRESION: EXPRESION suma EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION multi EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line, this._$.first_column+1);}
         | EXPRESION div EXPRESION   {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line, this._$.first_column+1);}
         | EXPRESION exponente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION modulo EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menor EXPRESION    {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line, this._$.first_column+1);}
         | EXPRESION mayor EXPRESION    {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menorIgual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line, this._$.first_column+1);}
         | EXPRESION mayorIgual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line, this._$.first_column+1);}
         | EXPRESION diferente EXPRESION  {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line, this._$.first_column+1);}
         | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line, this._$.first_column+1);}
         | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line, this._$.first_column+1);}
         | menos EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.UNARIA,this._$.first_line, this._$.first_column+1);}
         | not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria(null,$2, TIPO_OPERACION.NOT,this._$.first_line, this._$.first_column+1);}
         | parA EXPRESION parC {$$=$2}
         | EXPRESION igualigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line, this._$.first_column+1);}
         | decimal {$$= INSTRUCCION.nuevoValor(Number($1),TIPO_VALOR.DECIMAL,this._$.first_line, this._$.first_column+1);}
         | entero {$$= INSTRUCCION.nuevoValor(Number($1),TIPO_VALOR.ENTERO,this._$.first_line, this._$.first_column+1);}
         | Rtrue {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
         | Rfalse {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
         | string {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.CADENA,this._$.first_line, this._$.first_column+1);}
         | identificador{$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.IDENTIFICADOR,this._$.first_line, this._$.first_column+1);}
         | char {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.CHAR,this._$.first_line, this._$.first_column+1);}
;

