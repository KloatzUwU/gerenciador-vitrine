import { ChangeEvent, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import BotaoCriar from '../BotaoCriar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BotaoCancelar from '../BotaoCancelar';
import './FormCriarLoja.css'

interface FormCriarLojaProps {
    onLojaCriada: () => void;
}

interface Segmento {
    id: number;
    name: string;
}

export default function FormCriarLoja({ onLojaCriada }: FormCriarLojaProps) {

    const [nome, SetNome] = useState('');
    const [alias, SetAlias] = useState('');
    const [link, setLink] = useState('');
    const [numero, setNumero] = useState('');
    const [validated, setValidated] = useState(false);
    const [imagem, setImagem] = useState<File | null>(null);
    const [imagemMobile, setImagemMobile] = useState<File | null>(null);
    const [imagemTablet, setImagemTablet] = useState<File | null>(null);
    const [imagemDesktop, setImagemDesktop] = useState<File | null>(null);
    const [segmento, setSegmento] = useState<Segmento[]>([])
    const [segmentoId, setSegmentoId] = useState<number | undefined>(undefined)

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
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault()
        setValidated(true);
        PostLoja();
    };

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

    function MudancaNomeAndAlias(e: ChangeEvent<HTMLInputElement>) {
        let VerificaNome = e.target.value

        SetNome(VerificaNome.replace(/\d+/g, ''))

        SetAlias(VerificaNome.replace(/\s+/g, '').replace(/\d+/g, '').replace(/[çáàâãäéèêëíìîïóòôõöúùûüÇÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜ]/gi, (match) => mapaAcentos[match]).replace(/(?![\w\s@#$!])[^\d]/g, ''))
    }

    function MudancaLink(e: ChangeEvent<HTMLInputElement>) {
        setLink(e.target.value)
    }

    function MudancaNumero(e: ChangeEvent<HTMLInputElement>) {
        setNumero(e.target.value.replace(/[^0-9]/g, ''))
    }

    async function PostLoja() {
        if (nome === '') {

        } else {
            try {
                const formData = new FormData();
                
                formData.append('name', nome);
                formData.append('alias', alias);
                formData.append('number', numero)
                
                if(segmentoId !== undefined){
                    formData.append('segment_id', segmentoId.toString())
                }

                imagem && formData.append('images', imagem);
                imagemMobile && formData.append('images', imagemMobile);
                imagemTablet && formData.append('images', imagemTablet);
                imagemDesktop && formData.append('images', imagemDesktop);

                await axios.post('http://64.226.114.207:3000/stores', formData)

                SetNome('');
                SetAlias('');
                onLojaCriada()
            } catch (error) {
                console.error('erro', error)
            }
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="d-flex justify-content-center d-flex align-items-center content-row">
                <Col md={4} className='content-col'>
                    <h3>Criar Loja</h3>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>
                            Nome da Loja
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Loja"
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
                            Preencha o Nome da Loja!
                        </Form.Control.Feedback>

                        <Form.Label>
                            Link da Loja
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Link"
                            required
                            value={link}
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
                            Numero da Loja
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Numero"
                            required
                            value={numero}
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
                    <div className='container-botoes'>
                        <Link to='/listagemLoja'>
                            <BotaoCancelar>Cancelar</BotaoCancelar>
                        </Link>
                        <BotaoCriar >Criar</BotaoCriar>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}