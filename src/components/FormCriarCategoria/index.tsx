import { ChangeEvent, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import BotaoCriar from '../BotaoCriar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BotaoCancelar from '../BotaoCancelar';
import './FormCriarCategoria.css'

interface FormCriarCategoriaProps {
    onCategoriaCriada: () => void;
}

export default function FormCriarCategoria({ onCategoriaCriada }: FormCriarCategoriaProps) {

    const [nome, SetNome] = useState('');
    const [alias, SetAlias] = useState('');
    const [validated, setValidated] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
      };

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        event.preventDefault()
        setValidated(true);
        PostCategoria();
      };

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
        'ç' : 'c', 'Ç': 'C'
      };

    function MudancaNomeAndAlias(e: ChangeEvent<HTMLInputElement>) {
        let VerificaNome = e.target.value
   
        SetNome(VerificaNome.replace(/\d+/g, ''))
        
        SetAlias(VerificaNome.replace(/\s+/g, '').replace(/\d+/g, '').replace(/[çáàâãäéèêëíìîïóòôõöúùûüÇÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜ]/gi, (match) => mapaAcentos[match]).replace(/(?![\w\s@#$!])[^\d]/g, ''))
    }

    async function PostCategoria() {
        if(nome === ''){
            
        } else {
            try {
                const formData = new FormData();

                formData.append('name', nome);
                formData.append('alias', alias);
                
                if (selectedFile) {
                  formData.append('image', selectedFile);
                }
    
                await axios.post('http://64.226.114.207:3000/categories', formData)
            
                SetNome('');
                SetAlias('');
                onCategoriaCriada()
            } catch (error) {
                console.error('erro', error)
            }
        }    
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} > 
            <Row className="Row">
                <Col md={4} className='Col'>
                    <h3>Criar Categoria</h3>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>
                            Nome da Categoria
                        </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Categoria"
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
                                Preencha o Nome da Categoria!
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
                    <BotaoCriar >Criar</BotaoCriar>
                    </div>
                </Col>
            </Row>
        </Form>

    );
}