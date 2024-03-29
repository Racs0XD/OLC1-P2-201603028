import React, { useState } from "react";
import Errores from './Errores';
import TablaSimbolos from './TablaSimbolos';
import AST from './AST';
import { Header, Icon, Menu, Segment, Button } from "semantic-ui-react";




function Reportes(props) {
  const error = props.errores;
  const simbolos = props.simbolos;
  const ast = props.ast;
  const [tab, setTab] = useState(2);

  const handleTabClick = (tabIndex) => {
    setTab(tabIndex);
  }

  return (
    <Segment className="Header">
      <Header  size='large'>

        <Icon name='tasks' />
        <Header.Content>Reportes</Header.Content>
      </Header>
      <Menu inverted borderless className="Nav">
        <Menu.Item className='opcion'>
          <Button color='pink' onClick={() => handleTabClick(2)} active={tab === 3}>Símbolos</Button>
        </Menu.Item>
        <Menu.Item className='opcion'>
          <Button color='purple' onClick={() => handleTabClick(3)} active={tab === 4}>AST</Button>
        </Menu.Item>
        <Menu.Item className='opcion'>
          <Button color='pink' onClick={() => handleTabClick(4)} active={tab === 2}>Errores</Button>
        </Menu.Item>
      </Menu>
      {tab === 2 && <TablaSimbolos simbolos = {simbolos} />}         
      {tab === 3 && <AST ast = {ast}/>}
      {tab === 4 && <Errores errores = {error} />}   

    </Segment>
  );
}

export default Reportes;
