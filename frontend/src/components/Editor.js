import React from 'react'
import { Button, Form, Grid, Header, Icon, Menu, Segment, TextArea } from 'semantic-ui-react'

function Editor(props) {
    return (
        
        <Segment className="Header">
            <Header size='large'>
                <Icon name='edit' />
                <Header.Content>Editor</Header.Content>
            </Header>
            <Menu inverted borderless className="Nav">
                <Menu.Item className='opcion'>
                    <input type="file" className="inputfile" accept='.tw' onChange={
                        (e) => {
                            if (e.target.files[0] != null) {
                                let reader = new FileReader()
                                console.log()
                                reader.readAsText(e.target.files[0], "UTF-8")
                                reader.onload = (a) => {
                                    props.setCurrentText(a.target.result)
                                    props.panes[props.active].text = a.target.result
                                }
                            }
                        }
                    } id="abrirArchivo" />

                    <label htmlFor="abrirArchivo" className={"ui violet button "}>
                        Abrir
                    </label>
                </Menu.Item>
                <Menu.Item className='opcion'>
                    <Button color='purple' onClick={() => {
                        const url = window.URL.createObjectURL(
                            new Blob([props.currentText], { type: 'text/plain' })
                        )
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', 'Archivo.tw')
                        document.body.appendChild(link)
                        link.click()
                    }}>Guardar</Button>
                </Menu.Item>
                <Menu.Item position='right' className='opcion'>
                    <Button color='pink' onClick={props.compilar}>Compilar</Button>
                </Menu.Item>
            </Menu>
            <br></br>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Segment>
                            <Header size='large'>
                                <Icon name='code' />
                                <Header.Content>Editor</Header.Content>
                            </Header>
                        </Segment>
                        <Menu pointing borderless>
                            {
                                props.panes.length > 1 ? (
                                    <Menu.Item as={Button} color='red' icon='delete' onClick={props.cerrar} />
                                ) : (
                                    <Menu.Item as={Button} disabled icon='delete' onClick={props.cerrar} />
                                )
                            }
                            <Menu.Item as={Button} color='blue' icon='add' onClick={props.add} />
                            {props.panes.map((c, index) =>
                                <Menu.Item key={index} value={index} color='teal' active={props.active === index} onClick={props.change}>{c.name}</Menu.Item>
                            )}
                        </Menu>
                        <Form>
                            <TextArea
                                value={props.currentText}
                                style={{ minHeight: 500, maxHeight: 500, fontFamily: "consolas" }}
                                onChange={props.updateText}
                                spellCheck={false}
                                wrap={'off'}
                            />
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Header size='large'>
                                <Icon name='terminal' />
                                <Header.Content>Consola</Header.Content>
                            </Header>
                        </Segment>
                        <Form>
                            <TextArea
                                disabled value={props.consola}
                                style={{ minHeight: 555, maxHeight: 555, fontFamily: "consolas" }}
                                spellCheck={false}
                                wrap={'off'}
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default Editor
