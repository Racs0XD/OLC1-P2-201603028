import React from 'react'
import { Header, Icon, Message, Segment, Table } from 'semantic-ui-react'

function Errores(props) {
    return (
        <>
        <Segment>
            <Header size="huge">
                <Icon name='exclamation'/>
                <Header.Content>Reporte de Errores</Header.Content>
            </Header>
        </Segment>{
            props.errores.length>0?(
                <>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Tipo de Error</Table.HeaderCell>
                            <Table.HeaderCell>Descripcion</Table.HeaderCell>
                            <Table.HeaderCell>Fila</Table.HeaderCell>
                            <Table.HeaderCell>Columna</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.errores.map((c,index)=>
                            <Table.Row>
                                <Table.Cell>{index+1}</Table.Cell>
                                <Table.Cell>{c.type}</Table.Cell>
                                <Table.Cell>{c.mensaje}</Table.Cell>
                                <Table.Cell>{c.fila}</Table.Cell>
                                <Table.Cell>{c.columna}</Table.Cell>
                            </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
                </>
            ):(
                <>
                <Message>
                    <Message.Header>No existen errores.</Message.Header>
                </Message>
                </>
            )
        }
            </>
    )
}

export default Errores