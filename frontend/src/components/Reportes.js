import React, { useState } from "react";
import Errores from './Errores';
import TablaSimbolos from './TablaSimbolos';
import AST from './AST';
import { Header, Icon, Menu, Segment, Button } from "semantic-ui-react";
const axios = require('axios').default




function Reportes(props) {
  const [errores, setErrores] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [ast, setAst] = useState(null);
  const [tab, setTab] = useState(2); // Inicialmente mostrar la vista de Errores

  const compi = () => {    
    setAst(null);
    // eslint-disable-next-line
    let data = '';
    let errores = [];
    let simbolos = [];
    let imagen = null;

    async function enviar() {
      const res = await axios.post("http://localhost:5000/");
      data = String(res.data.data);
      errores = res.data.errores;
      simbolos = res.data.symbols;
      imagen = res.data.ast;
      setErrores(errores);
      setSymbols(simbolos);
      if (res.data.ast !== null) {
        setAst("data:image/png;base64," + imagen);
      } else {
        setAst(null);
      }
    }


    enviar();
  }

  const handleTabClick = (tabIndex) => {
    setTab(tabIndex);
  }

  return (
    <Segment className="Header">
      <Header onClick={compi} size='large'>

        <Icon name='tasks' />
        <Header.Content>Reportes</Header.Content>
      </Header>
      <Menu inverted borderless className="Nav">
        <Menu.Item className='opcion'>
          <Button color='violet' onClick={() => handleTabClick(2)} active={tab === 2}>Errores</Button>
        </Menu.Item>
        <Menu.Item className='opcion'>
          <Button color='purple' onClick={() => handleTabClick(3)} active={tab === 4}>AST</Button>
        </Menu.Item>
        <Menu.Item className='opcion'>
          <Button color='pink' onClick={() => handleTabClick(4)} active={tab === 3}>Símbolos</Button>
        </Menu.Item>
      </Menu>
      {tab === 2 && <Errores errores={errores} />}
      {tab === 3 && <AST ast={ast} />}
      {tab === 4 && <TablaSimbolos symbols={symbols} />}

    </Segment>
  );
}

export default Reportes;
