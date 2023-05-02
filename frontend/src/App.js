import './App.css';
import Head from './components/Head';
import Editor from './components/Editor';
import Reportes from './components/Reportes';
import Foot from './components/Foot'
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [paneCount, setPaneCount] = useState(2)
  const [active, setActive] = useState(0)
  const [panes, setPanes] = useState([{ name: 'Panel 1', text: '' }])
  const [currentText, setCurrentText] = useState(panes[active].text)
  const [consola, setConsola] = useState('')
  const [reportes, setReportes] = useState('')
  const [tab, setTab] = useState(0)
  const [errores, setErrores] = useState([]);
  const [simbolos, setSimboles] = useState([]);
  const [ast, setAst] = useState(null);


  var compilar = () => {
    setAst(null);
    var data = ''
    var reportes = '';
    let errores = '';
    let simbolos = [];
    let imagen = null;
    async function enviar() {
      let res = await axios.post("http://localhost:5000/analizar", { entrada: currentText });
      data = String(res.data.resultado)
      reportes = res.data.reportes
      errores = res.data.errores;      
      simbolos = res.data.tabSimbolos;
      imagen = res.data.arbol;
      console.log(imagen)
      setReportes(reportes)
      setConsola(data)      
      setErrores(errores);
      setSimboles(simbolos);
      if (res.data.arbol !== null) {
        setAst("data:image/png;base64," + imagen);
      } else {
        console.log("AST NULO")
        setAst(null);
      }
    }

    enviar()
  }

  const add = () => {
    let newPanes = panes
    setPaneCount(parseInt(paneCount) + 1)
    newPanes.push({ name: 'Panel ' + paneCount, text: '' })
    setPanes(newPanes)
    setActive(panes.length - 1)
    setCurrentText(panes[panes.length - 1].text)
  }
  const change = (e) => {
    for (let index = 0; index < panes.length; index++) {
      if (panes[index].name === e.target.innerText) {
        setActive(index)
        setCurrentText(panes[index].text)
        break
      }
    }
  }
  const mode = (v) => {
    setTab(v)
  }
  const cerrar = () => {
    if (panes.length > 1) {
      let newPanes = []
      for (let index = 0; index < panes.length; index++) {
        if (index !== active) {
          newPanes.push(panes[index])
        }
      }
      if (newPanes.length - 1 < active) {
        setActive(newPanes.length - 1)
        setCurrentText(newPanes[newPanes.length - 1].text)
      } else {
        setCurrentText(newPanes[active].text)
      }
      setPanes(newPanes)
    }
  }
  const updateText = (e) => {
    panes[active].text = e.target.value
    setCurrentText(e.target.value)
  }
  return (
    <>
      <Head
        panes={panes}
        active={active}
        setCurrentText={setCurrentText}
        mode={mode}
        tab={tab}
        currentText={currentText}
      />
      <div className='Content'>
        <br />
        <div className="ui segment cuerpo">
          {
            tab === 0 ? (
              <Editor
                cerrar={cerrar}
                add={add}
                panes={panes}
                active={active}
                change={change}
                currentText={currentText}
                setCurrentText={setCurrentText}
                consola={consola}
                updateText={updateText}
                compilar={compilar}
              />
            ) : tab === 1 ? (
              <>
                <Reportes
                  reportes={reportes}
                  errores={errores}
                  ast={ast}
                  simbolos={simbolos}
                />
              </>
            ) : (
              <></>
            )
          }
        </div>
        <br />
      </div>
      <Foot />
    </>
  );

}


export default App;
