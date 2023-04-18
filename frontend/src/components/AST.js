import React from 'react'
import { Header, Icon, Message, Segment, Image } from 'semantic-ui-react'

function AST(props) {
    return (
        <>
        <Segment>
            <Header size="huge">
                <Icon name='pie graph'/>
                <Header.Content>Árbol de Análisis Sintáctico</Header.Content>
            </Header>
        </Segment>{
            props.ast!=null?(
                <Image fluid src={props.ast}/>
            ):(
                <>
                <Message>
                    <Message.Header>No se ha generado ningun AST.</Message.Header>
                </Message>
                </>
            )
        }
            </>
    )
}

export default AST