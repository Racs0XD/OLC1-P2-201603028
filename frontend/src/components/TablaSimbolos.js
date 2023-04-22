import React from 'react'
import { Header, Icon, Message, Segment, Table } from 'semantic-ui-react'

function TablaSimbolos(props) {
    return (
        <>
            <Segment>
                <Header size="huge">
                    <Icon name='table' />
                    <Header.Content>Tabla de Símbolos</Header.Content>
                </Header>
            </Segment>{
                props.simbolos.length > 0 ? (
                    <>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>#</Table.HeaderCell>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Tipo</Table.HeaderCell>
                                    <Table.HeaderCell>Estructura</Table.HeaderCell>
                                    <Table.HeaderCell>Entorno</Table.HeaderCell>
                                    <Table.HeaderCell>Fila</Table.HeaderCell>
                                    <Table.HeaderCell>Columna</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {props.simbolos.map((c, index) =>
                                    <Table.Row key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{c.identificador}</Table.Cell>
                                        <Table.Cell>{c.tipoSimbolo}</Table.Cell>
                                        <Table.Cell>{c.tipoVar}</Table.Cell>
                                        <Table.Cell>{c.entorno}</Table.Cell>
                                        <Table.Cell>{c.linea}</Table.Cell>
                                        <Table.Cell>{c.columna}</Table.Cell>
                                    </Table.Row>
                                )}

                            </Table.Body>
                        </Table>
                    </>
                ) : (
                    <>
                        <Message>
                            <Message.Header>No existen símbolos de salida.</Message.Header>
                        </Message>
                    </>
                )
            }
        </>
    )
}

export default TablaSimbolos