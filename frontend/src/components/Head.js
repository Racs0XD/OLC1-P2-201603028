import React from 'react'
import { Header, Icon, Menu, Segment, Button } from 'semantic-ui-react'

function Head(props) {
  return (
    <Segment className="Header">
      <Header size='large'>
                <Icon name='file code outline' />
                <Header.Content>TypeWise</Header.Content>
            </Header>
      <Menu inverted borderless className="Nav">
        <Header className="Title">
          TypeWise
        </Header>
        <Menu.Item className='opcion'>
          <Button color='purple' onClick={() => { props.mode(0) }}>Editor</Button>
        </Menu.Item>
        <Menu.Item className='opcion'>
          <Button color='pink' onClick={() => { props.mode(1) }}>Reportes</Button>
        </Menu.Item>
      </Menu>
    </Segment>
  )
}

export default Head
