import React, { useState } from 'react'
import { Button, Form, Grid, Header, Icon, Menu, Segment, TextArea } from 'semantic-ui-react'

function Editor(props) {
    const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

    const handleKeyUp = () => {
        const textArea = document.getElementById('textArea');
        const text = textArea.value;
        const cursorPosStart = textArea.selectionStart;
        const cursorLine = text.substr(0, cursorPosStart).split('\n').length;
        const cursorCol = cursorPosStart - text.lastIndexOf('\n', cursorPosStart - 1);
        setCursorPos({ line: cursorLine, col: cursorCol });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
            handleKeyUp();
        }
    }
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
                                id="textArea"
                                className="Editor"
                                value={props.currentText}
                                style={{ minHeight: 500, maxHeight: 500, fontFamily: "consolas" }}
                                onChange={(e) => {
                                    props.setCurrentText(e.target.value);
                                    handleKeyUp();
                                }}
                                onKeyDown={handleKeyDown}
                            />
                            <Header size='tiny' className='posicionCursor'>
                                Linea {cursorPos.line}, Columna {cursorPos.col}
                            </Header>
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
