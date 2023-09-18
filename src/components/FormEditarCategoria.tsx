import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FloatingLabel } from 'react-bootstrap';
import BotaoCriar from './BotaoCriar';
import axios from 'axios';

interface Categoria {
    id: number;
    name: string;
    alias: string;
}

interface FormEditarCategoriaProps {
    onCategoriaEditada: () => void
}

export default function FormEditarCategoria({ onCategoriaEditada }: FormEditarCategoriaProps) {
    const { id } = useParams();

    const [nomeEditado, SetNomeEditado] = useState('');
    const [aliasEditado, SetAliasEditado] = useState('');
    const [nome, SetNome] = useState('');
    const [alias, SetAlias] = useState('');

    const [categoria, setCategoria] = useState<Categoria[]>([]);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault()
        setValidated(true);
        PutCategoria()
    };

    useEffect(() => {
        fetch(`http://64.226.114.207:3334/categories/${id}`)
            .then(res => res.json())
            .then((resultado: Categoria[]) => {
                setCategoria(resultado);
                if (resultado.length > 0) {
                    SetNome(resultado[0].name)
                    SetAlias(resultado[0].alias)
                }
            });
    }, [id]);

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

    async function PutCategoria() {
        if (nomeEditado === '') {

        } else {
            try {
                const categoria = {
                    "name": nomeEditado,
                    "alias": aliasEditado
                };

                await axios.put(`http://64.226.114.207:3334/categories/${id}`, categoria)

                SetNomeEditado('');
                SetAliasEditado('');
                onCategoriaEditada()
            } catch (error) {
                console.error('erro', error)
            }
        }
    }


    if (categoria.length === 0) {
        return <div>Carregando...</div>;
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <Col md={4} style={{ border: 'dashed', padding: '30px', borderColor: '#FA8072', justifyContent: 'center', marginBottom: '250px' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '15px' }} >Editar Categoria: {nome}</h3>
                        <Form.Group controlId="validationCustom01">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Nome da Categoria"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Nome da Categoria"
                                    required
                                    value={nomeEditado}
                                    onChange={EditarNomeAndAlias}
                                />
                                <Form.Control.Feedback
                                    type='invalid'
                                >
                                    Edite o Nome da Categoria!
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                            <Link to='/listagem'>
                                <Button style={{ marginRight: '20px' }} variant='outline-danger'>Cancelar</Button>
                            </Link>
                            <BotaoCriar >Editar</BotaoCriar>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
