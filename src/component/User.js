import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { Button, Card, Input, Radio } from 'antd';
import Form from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'



// eslint-disable-next-line no-lone-blocks
{/*
    import Select from 'react-select';
    const administracion = [
    { values: 'SAC', label: 'Servicio al contribuyente' },
    { values: 'RE', label: 'Recaudación' },
    { values: 'AU', label: 'Auditoria' },
    { values: 'JU', label: 'Juridica' }
]*/}

export default class User extends Component {

    state = {
        usuarios: [],
        rfc8: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/usuarios');
        this.setState({ usuarios: res.data })
        console.log(this.state.usuarios)
    }

    onChange = (e) => {
        this.setState({
            rfc8: e.target.value
        })
        console.log(e.target.value)
    }

    onFinish = async e => {
        const res = await axios.post('http://localhost:4000/api/usuarios', {
            rfc8: this.state.rfc8

        })
        console.log(res)
    }

    render() {
        return (
            <Fragment>
                <div>
                    <Card>
                        <Form onSubmit={this.onFinish}>
                            <FormItem label="RFC8">
                                <Input name='rfc8' placeholder="Ingresa tu RFC8" onChange={this.onChange} />
                            </FormItem>
                            <FormItem label="Administración">
                                <Input name='admi' placeholder="Ingresa tu Administración" />
                            </FormItem>
                            <FormItem>
                                <Radio.Group name="problema">
                                    <Radio value={"Impresora"}>Impresora</Radio>
                                    <Radio value={'Telefono'}>Telefono</Radio>
                                    <Radio value={'Comunicación'}>Comunicación</Radio>
                                    <Radio value={'Computadora'}>Computadora</Radio>
                                    <Radio value={'Otros'}>Otros</Radio>
                                </Radio.Group>
                            </FormItem>
                            <FormItem label="Descripción">
                                <Input.TextArea name="descri" />
                            </FormItem>
                            <FormItem>
                                <Button type="primary" size="large" htmlType="submit">Enviar</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            </Fragment>
        )
    }
}
