import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BotaoCancelar from '../BotaoCancelar';
import BotaoCriar from '../BotaoCriar';
import './FormCriarSubCategoria.css'

interface FormEditarSubCategoriaProps {
    onSubCategoriaCriada: () => void
}

interface Categoria {
    id: number;
    name: string;
    alias: string;
}

export default function FormCriarSubCategoria({ onSubCategoriaCriada }: FormEditarSubCategoriaProps) {
    const [nome, SetNome] = useState('');
    const [alias, SetAlias] = useState('');
    const [validated, setValidated] = useState(false);
    const [categoria, setCategoria] = useState<Categoria[]>([])
    const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault()
        setValidated(true);
        PostCategoria();
    };

    useEffect(() => {
        axios.get(`http://64.226.114.207:3334/categories`)
            .then(res => {
                const resultado: Categoria[] = res.data;
                setCategoria(resultado);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    const mapaAcentos: Record<string, string> = {
        'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'Á': 'A', 'À': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A',
        'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
        'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
        'Ó': 'O', 'Ò': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O',
        'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
        'ç': 'c', 'Ç': 'C'
    };

    function MudancaNomeAndAlias(e: ChangeEvent<HTMLInputElement>) {
        let VerificaNome = e.target.value

        SetNome(VerificaNome.replace(/\d+/g, ''))

        SetAlias(VerificaNome.replace(/\s+/g, '').replace(/\d+/g, '').replace(/[çáàâãäéèêëíìîïóòôõöúùûüÇÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜ]/gi, (match) => mapaAcentos[match]).replace(/(?![\w\s@#$!])[^\d]/g, ''))
    }

    async function PostCategoria() {
        if (nome === '') {

        } else {
            try {
                const SubCategoria = {
                    "name": nome,
                    "alias": alias,
                    "categoryId": categoriaId,
                };

                await axios.post('http://64.226.114.207:3334/subcategories', SubCategoria)

                SetNome('');
                SetAlias('');
                onSubCategoriaCriada()
            } catch (error) {
                console.error('erro', error)
            }
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="Row">
                <Col md={4} className="Col">
                    <h3>Criar SubCategoria</h3>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>
                            Nome da SubCategoria
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="SubCategoria"
                            required
                            value={nome}
                            onChange={MudancaNomeAndAlias}
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
                            Preencha o Nome da SubCategoria!
                        </Form.Control.Feedback>
                        <Form.Label>
                            Selecione a Categoria
                        </Form.Label>
                        <Form.Select
                            value={categoriaId}
                            onChange={(e) => setCategoriaId(Number(e.target.value))}
                            onFocus={(e) => {
                                e.target.style.border = '2px solid #353935';
                                e.target.style.boxShadow = '0 0 0px';
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '1px solid #ced4da';
                                e.target.style.boxShadow = 'none';
                            }}
                            id="validationCustom04"
                            required
                        >
                            <option selected disabled></option>
                            {categoria.map(categoriaItem => (
                                <option key={categoriaItem.id} value={categoriaItem.id}>{categoriaItem.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="ContainerBotoes">
                        <Link to='/listagemSubCategoria'>
                            <BotaoCancelar>Cancelar</BotaoCancelar>
                        </Link>
                        <BotaoCriar >Criar</BotaoCriar>
                    </div>
                </Col>
            </Row>
        </Form>

    );
}
