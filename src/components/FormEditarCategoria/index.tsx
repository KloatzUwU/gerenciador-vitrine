import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BotaoCriar from '../BotaoCriar';
import axios from 'axios';
import BotaoCancelar from '../BotaoCancelar';
import './FormEditarCategoria.css'

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

    const [categoria, setCategoria] = useState<Categoria[]>([]);
    const [validated, setValidated] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
      };

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
        fetch(`http://64.226.114.207:3000/categories/${id}`)
            .then(res => res.json())
            .then((resultado: Categoria[]) => {
                setCategoria(resultado);
                if (resultado.length > 0) {
                    SetNome(resultado[0].name)
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
                const formData = new FormData();

                formData.append('name', nomeEditado);
                formData.append('alias', aliasEditado);
                
                if (selectedFile) {
                  formData.append('image', selectedFile);
                }

                await axios.put(`http://64.226.114.207:3000/categories/${id}`, formData)

                SetNomeEditado('');
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
                <Row className="Row">
                    <Col md={4} className='Col'>
                        <h3>Editar Categoria</h3>
                        <Form.Group controlId="validationCustom01">
                        <Form.Label>
                            Edite o nome da Categoria
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
                                    Edite o Nome da Categoria!
                                </Form.Control.Feedback>
                                <Form.Label>Foto da Categoria</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    onChange={handleFileChange}
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
                                />
                        </Form.Group>
                        <div className='ContainerBotoes'>
                            <Link to='/listagemCategoria'>
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
