import './App.css';
import Head from './components/Head';
import Editor from './components/Editor';
import Reportes from './components/Reportes';
import Foot from './components/Foot'
import { useState } from 'react';
const axios = require('axios').default

function App() {
  const [paneCount, setPaneCount] = useState(2)
  const [active, setActive] = useState(0)
  const [panes, setPanes] = useState([{name:'Panel 1', text:''}])
  const [currentText, setCurrentText] = useState(panes[active].text)
  const [consola, setConsola] = useState('')
  const [reportes, setReportes] = useState('')
  const [tab, setTab] = useState(0)
  var compilar = ()=>{
    var data = ''
    var reportes = '';
    async function enviar(){
        let res = await axios.post("http://localhost:3000/compilar", {codigo: currentText});
        data = String(res.data.data)
        reportes = res.data.reportes
        setReportes(reportes)
        setConsola(String(data))         
    }
    enviar()
  }
  const add = ()=>{
    let newPanes = panes
    setPaneCount(parseInt(paneCount)+1)
    newPanes.push({name: 'Panel '+paneCount, text:''})
    setPanes(newPanes)
    setActive(panes.length-1)
    setCurrentText(panes[panes.length-1].text)
  }
  const change = (e)=>{
    for (let index = 0; index < panes.length; index++) {
      if(panes[index].name === e.target.innerText){
        setActive(index)
        setCurrentText(panes[index].text)
        break
      }
    }
  }
  const mode = (v)=>{
    setTab(v)
  }   
  const cerrar = ()=>{
    if (panes.length>1){
      let newPanes = []
      for (let index = 0; index < panes.length; index++) {
        if(index !== active){
          newPanes.push(panes[index])
        }
      }
      if (newPanes.length-1<active){
        setActive(newPanes.length-1)
        setCurrentText(newPanes[newPanes.length-1].text)
      }else{
        setCurrentText(newPanes[active].text)
      }
      setPanes(newPanes)
    }
  }
  const updateText = (e)=>{
    panes[active].text = e.target.value
    setCurrentText(e.target.value)
  }
    return (
      <>
          <Head
            panes={panes}
            active={active}
            compilar={compilar}
            setCurrentText={setCurrentText}
            mode={mode}
            tab={tab}
            currentText={currentText}
          />
          <div className='Content'>
            <br/>
            <div className="ui segment cuerpo">
              {
                tab===0?(
                  <Editor
                  cerrar={cerrar}
                  add={add}
                  panes={panes}
                  active={active}
                  change={change}
                  currentText={currentText}
                  consola={consola}
                  updateText={updateText}
                  />
                ):tab===1?(
                  <>
                  <Reportes
                  reportes={reportes}
                  />
                  </>
                ):(
                  <></>
                )
              }
            </div>
            <br/>
          </div>
          <Foot/>
          </>
    );
  
}


export default App;
