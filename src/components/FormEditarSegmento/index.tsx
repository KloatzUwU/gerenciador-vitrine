import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BotaoCriar from '../BotaoCriar';
import axios from 'axios';
import BotaoCancelar from '../BotaoCancelar';
import './FormEditarSegmento.css'

interface Segmento {
    id: number;
    name: string;
}

interface FormEditarSegmentoProps {
    onSegmentoEditado: () => void
}

export default function FormEditarSegmento({ onSegmentoEditado }: FormEditarSegmentoProps) {
    const { id } = useParams();

    const [nomeEditado, SetNomeEditado] = useState('');
    const [nome, SetNome] = useState('');

    const [segmento, setSegmento] = useState<Segmento[]>([]);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault()
        setValidated(true);
        PutSegmento()
    };

    useEffect(() => {
        fetch(`http://64.226.114.207:3000/segment/${id}`)
            .then(res => res.json())
            .then((resultado: Segmento[]) => {
                setSegmento(resultado);
                if (resultado.length > 0) {
                    SetNome(resultado[0].name)
                }
            });
    }, [id]);

    function EditarNome(e: ChangeEvent<HTMLInputElement>) {
        let VerificaNome = e.target.value

        SetNomeEditado(VerificaNome.replace(/\d+/g, ''))

    }

    async function PutSegmento() {
        if (nomeEditado === '') {

        } else {
            try {
                const segmento = {
                    "name": nomeEditado
                }

                await axios.put(`http://64.226.114.207:3000/segment/${id}`, segmento)

                SetNomeEditado('');
                onSegmentoEditado()
            } catch (error) {
                console.error('erro', error)
            }
        }
    }


    if (segmento.length === 0) {
        return <div>Carregando...</div>;
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="d-flex justify-content-center d-flex align-items-center content-row">
                    <Col md={4} className='content-col'>
                        <h3>Editar Segmento</h3>
                        <Form.Group controlId="validationCustom01">
                        <Form.Label>
                            Edite o nome do Segmento
                        </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={nome}
                                    required
                                    value={nomeEditado}
                                    onChange={EditarNome}
                                    onFocus={(e) => {
                                        e.target.style.border = '2px solid #353935';  
                                        e.target.style.boxShadow = '0 0 0px';
                                      }}
                                      onBlur={(e) => {
                                        e.target.style.border = '1px solid #ced4da'; 
                                        e.target.style.boxShadow = 'none';
                                      }}
                                />
                                <Form.Control.Feedback
                                    type='invalid'
                                >
                                    Edite o Nome do Segmento!
                                </Form.Control.Feedback>
                        </Form.Group>
                        <div className='container-botoes'>
                            <Link to='/listagemSegmento'>
                                <BotaoCancelar>Cancelar</BotaoCancelar>
                            </Link>
                            <BotaoCriar>Editar</BotaoCriar>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
