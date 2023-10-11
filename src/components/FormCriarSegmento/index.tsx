import { ChangeEvent, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import BotaoCriar from '../BotaoCriar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BotaoCancelar from '../BotaoCancelar';
import './FormCriarSegmento.css'

interface FormCriarSegmentoProps {
    onSegmentoCriado: () => void;
}

export default function FormCriarSegmento({ onSegmentoCriado }: FormCriarSegmentoProps) {

    const [nome, SetNome] = useState('');
    const [validated, setValidated] = useState(false);

    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0] || null;
    //     setSelectedFile(file);
    //   };

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


    function MudancaNomeAndAlias(e: ChangeEvent<HTMLInputElement>) {
        let VerificaNome = e.target.value
   
        SetNome(VerificaNome.replace(/\d+/g, ''))
        
        
    }

    async function PostCategoria() {
        if(nome === ''){
            
        } else {
            try {
                const segmento = {
                    "name": nome
                }
    
                await axios.post('http://64.226.114.207:3000/segment', segmento)
            
                SetNome('');
                onSegmentoCriado()
            } catch (error) {
                console.error('erro', error)
            }
        }    
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} > 
            <Row className="Row">
                <Col md={4} className='Col'>
                    <h3>Criar Segmento</h3>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>
                            Nome do Segmento
                        </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Segmento"
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
                                Preencha o Nome do Segmento!
                            </Form.Control.Feedback>
                    </Form.Group>
                    <div className='ContainerBotoes'>
                    <Link to='/listagemSegmento'>
                        <BotaoCancelar>Cancelar</BotaoCancelar>
                    </Link>
                    <BotaoCriar >Criar</BotaoCriar>
                    </div>
                </Col>
            </Row>
        </Form>

    );
}