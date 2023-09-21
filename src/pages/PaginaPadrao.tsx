import Cabecalho from '../components/Cabecalho'

export default function PaginaPadrao() {
  return (
    <>
        <Cabecalho>CRUD DataBase</Cabecalho>     
        <div style={{textAlign: 'center'}}>
          <h3>Este CRUD foi feito para gerenciar os dados da API de Vitrine do CasaPark</h3>
          <h3>Nesse CRUD voce pode Criar, Listar, Editar e Deletar Categorias da Vitrine do CasaPark</h3>
          <h3>Para utilizar das funções do CRUD navegue pela NavBar acima</h3> 
        </div>  
    </>
  )
}