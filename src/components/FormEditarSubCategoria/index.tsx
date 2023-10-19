import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BotaoCriar from '../BotaoCriar';
import axios from 'axios';
import BotaoCancelar from '../BotaoCancelar';
import './FormEditarSubCategoria.css'

interface SubCategoria {
    id: number;
    name: string;
    alias: string;
    category_id: number;
}

interface Categoria {
    id: number;
    name: string;
    alias: string;
}

interface FormEditarSubCategoriaProps {
    onSubCategoriaEditada: () => void
}

export default function FormEditarSubCategoria({ onSubCategoriaEditada }: FormEditarSubCategoriaProps) {
    const { id } = useParams();

    const [nomeEditado, SetNomeEditado] = useState('');
    const [aliasEditado, SetAliasEditado] = useState('');
    const [nome, SetNome] = useState('');

    const [categoria, setCategoria] = useState<Categoria[]>([])
    const [SubCategoria, setSubCategoria] = useState<SubCategoria[]>([]);
    const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined)
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || categoriaId === undefined) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault()
        setValidated(true);
        PutSubCategoria()
    };

    useEffect(() => {
        axios.get(`http://64.226.114.207:3000/subcategories/${id}`)
            .then(res => {
                const resultado: SubCategoria[] = res.data;
                setSubCategoria(resultado);
                if (resultado.length > 0) {
                    SetNome(resultado[0].name);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://64.226.114.207:3000/categories`)
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

    function EditarNomeAndAlias(e: ChangeEvent<HTMLInputElement>) {
        let VerificaNome = e.target.value

        SetNomeEditado(VerificaNome.replace(/\d+/g, ''))

        SetAliasEditado(VerificaNome.replace(/\s+/g, '').replace(/\d+/g, '').replace(/[çáàâãäéèêëíìîïóòôõöúùûüÇÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜ]/gi, (match) => mapaAcentos[match]).replace(/(?![\w\s@#$!])[^\d]/g, ''))
    }

    async function PutSubCategoria() {
        if (nomeEditado === '' || categoriaId === undefined) {

        } else {
            try {
                const Subcategoria = {
                    "name": nomeEditado,
                    "alias": aliasEditado,
                    "categoryId": categoriaId
                };
                console.log(categoriaId);

                await axios.put(`http://64.226.114.207:3000/subcategories/${id}`, Subcategoria)

                SetNomeEditado('');
                onSubCategoriaEditada()
            } catch (error) {
                console.error('erro', error)
            }
        }
    }

    if (SubCategoria.length === 0) {
        return <div>Carregando...</div>;
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className='d-flex justify-content-center d-flex align-items-center content-row'>
                    <Col md={4} className='content-col'>
                        <h3>Editar SubCategoria</h3>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>
                                Edite o nome da SubCategoria
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={nome}
                                required
                                value={nomeEditado}
                                onChange={EditarNomeAndAlias}
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
                                Edite o Nome da SubCategoria!
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
                        <div className='container-botoes'>
                            <Link to='/listagemSubCategoria'>
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
