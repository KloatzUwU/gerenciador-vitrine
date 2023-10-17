import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BotaoCriar from '../BotaoCriar';
import axios from 'axios';
import BotaoCancelar from '../BotaoCancelar';
import './FormEditarLoja.css'

interface Loja {
    id: number;
    name: string;
    image: File | null
    alias: string;
    link: string;
    number: string
    segment_id: number;
    segment_name: string;
}

interface Segmento {
    id: number;
    name: string;
}

interface FormEditarLojaProps {
    onLojaEditada: () => void
}

export default function FormEditarLoja({ onLojaEditada }: FormEditarLojaProps) {
    const { id } = useParams();

    const [nomeEditado, SetNomeEditado] = useState('');
    const [aliasEditado, SetAliasEditado] = useState('');
    const [linkEditado, setLinkEditado] = useState('');
    const [numeroEditado, setNumeroEditado] = useState('')
    const [nome, SetNome] = useState('');
    const [link, setLink] = useState('');
    const [numero, setNumero] = useState('');
    const [loja, setLoja] = useState<Loja[]>([])
    const [segmento, setSegmento] = useState<Segmento[]>([])
    const [segmentoId, setSegmentoId] = useState<number | undefined>(undefined)
    const [validated, setValidated] = useState(false);
    const [imagem, setImagem] = useState<File | null>(null);
    const [imagemMobile, setImagemMobile] = useState<File | null>(null);
    const [imagemTablet, setImagemTablet] = useState<File | null>(null);
    const [imagemDesktop, setImagemDesktop] = useState<File | null>(null);

    const handleImagem = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImagem(file);
    };

    const handleImagemMobile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImagemMobile(file);
    };

    const handleImagemTablet = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImagemTablet(file);
    };

    const handleImagemDesktop = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImagemDesktop(file);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || segmentoId === undefined) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault()
        setValidated(true);
        PutLoja()
    };

    useEffect(() => {
        axios.get(`http://64.226.114.207:3000/stores/${id}`)
            .then(res => {
                const resultado: Loja[] = res.data;
                setLoja(resultado);
                if (resultado.length > 0) {
                    SetNome(resultado[0].name);
                    setLink(resultado[0].link)
                    setNumero(resultado[0].number)
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://64.226.114.207:3000/segment`)
            .then(res => {
                const resultado: Segmento[] = res.data;
                setSegmento(resultado);
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

    function MudancaLink(e: ChangeEvent<HTMLInputElement>) {
        setLinkEditado(e.target.value)
    }

    function MudancaNumero(e: ChangeEvent<HTMLInputElement>) {
        setNumeroEditado(e.target.value.replace(/[^0-9]/g, ''))
    }

    async function PutLoja() {
        if (nomeEditado === '' || segmentoId === undefined) {

        } else {
            try {

                const formData = new FormData();
                
                formData.append('name', nomeEditado);
                formData.append('alias', aliasEditado);
                formData.append('number', numeroEditado)
                
                if(segmentoId !== undefined){
                    formData.append('segment_id', segmentoId.toString())
                }

                imagem && formData.append('images', imagem);
                imagemMobile && formData.append('images', imagemMobile);
                imagemTablet && formData.append('images', imagemTablet);
                imagemDesktop && formData.append('images', imagemDesktop);
                
                await axios.put(`http://64.226.114.207:3000/stores/${id}`, formData)

                SetNomeEditado('');
                onLojaEditada()
            } catch (error) {
                console.error('erro', error)
            }
        }
    }

    if (loja.length === 0) {
        return <div>Carregando...</div>;
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="Row">
                <Col md={4} className='Col'>
                    <h3>Editar Loja</h3>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>
                            Edite o nome da Loja
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
                        Edite o Nome da Loja!
                        </Form.Control.Feedback>

                        <Form.Label>
                            Edite o Link da Loja
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={link}
                            required
                            value={linkEditado}
                            onChange={MudancaLink}
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
                            Preencha o Link da Loja!
                        </Form.Control.Feedback>

                        <Form.Label>
                            Edite o Numero da Loja
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={numero}
                            required
                            value={numeroEditado}
                            onChange={MudancaNumero}
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
                            Preencha o Numero da Loja!
                        </Form.Control.Feedback>

                        <Form.Label>
                            Selecione o Segmento
                        </Form.Label>
                        <Form.Select
                            value={segmentoId}
                            onChange={(e) => setSegmentoId(Number(e.target.value))}
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
                            {segmento.map(segmentoItem => (
                                <option key={segmentoItem.id} value={segmentoItem.id}>{segmentoItem.name}</option>
                            ))}
                        </Form.Select>

                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={handleImagem}
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

                        <Form.Label>Logo Mobile (767 x 500)</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".jpg, .jpeg, .png, .gif"
                                onChange={handleImagemMobile}
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

                        <Form.Label>Logo Tablet (992 x 500)</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    onChange={handleImagemTablet}
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

                        <Form.Label>Logo Desktop (1920 x 843)</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    onChange={handleImagemDesktop}
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
                        <Link to='/listagemLoja'>
                            <BotaoCancelar>Cancelar</BotaoCancelar>
                        </Link>
                        <BotaoCriar >Criar</BotaoCriar>
                    </div>
                </Col>
            </Row>
        </Form>

        </>
    );
}