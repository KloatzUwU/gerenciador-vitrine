import axios from 'axios';
import { useEffect, useState } from 'react'
import BotaoEditar from './BotaoEditar';
import BotaoRemover from './BotaoRemover';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

interface SubCategoriaItem {
    name: string;
    alias: string;
    id: number;
}

interface CategoriaComSubCategoria{
    name: string;
    alias: string;
    id: number;
    subcategories: SubCategoriaItem[]
} 

export default function SubCategoria() {
    const [subCategoria, setSubCategoria] = useState<SubCategoriaItem[]>([])
    const [CategoriaComSubCategoria, setCategoriaComSubCategoria] = useState<CategoriaComSubCategoria[]>([])

    useEffect(() => {
        axios.get('http://64.226.114.207:3334/subcategories')
          .then(res => {
            const resultado: SubCategoriaItem[] = res.data; 
            setSubCategoria(resultado)
          })
          .catch(error => {
            console.error('Erro ao buscar dados:', error)
          });
      }, []);

      useEffect(() => {
        axios.get('http://64.226.114.207:3334/categoriesWithSubcategories/')
          .then(res => {
            const resultado: CategoriaComSubCategoria[] = res.data; 
            setCategoriaComSubCategoria(ListaCategoriasComSubcategorias(resultado))
          })
          .catch(error => {
            console.error('Erro ao buscar dados:', error)
          });
      }, []);


      function ExcluirSubCategoria(){
        
      }

      function ListaCategoriasComSubcategorias(categorias: CategoriaComSubCategoria[]){
        const categoriasComSubcategorias = categorias.filter(categoriaItem => categoriaItem.subcategories.length > 0 ? categoriaItem : '')
        return categoriasComSubcategorias
      }

      function RetornaNomeCategoria(id: number[]){
        const categoria = CategoriaComSubCategoria.filter((categoriaItem) => 
            categoriaItem.subcategories.some((subcategoria) => id.includes(subcategoria.id))
        );
        return categoria[0]?.name
      }

  return (
    <div style={{  justifyContent: 'center', paddingTop: '30px'}}>
            <Table responsive striped bordered hover size='sm'>
            <thead style={{textAlign: 'center'}}>
                    <tr>
                        <th style={{width: '30px'}}>
                            ID
                        </th>
                        <th style={{width: '150px'}}>
                            Nome
                        </th>
                        <th style={{width: '150px'}}>
                            Alias
                        </th>
                        <th style={{width: '150px'}}>
                            Categoria
                        </th>
                        <th style={{width: '50px'}}>
                            Ações
                        </th>
                    </tr>
                </thead>
            {subCategoria.map(SubCategoriaItem => (    
                <tbody key={SubCategoriaItem.id} style={{textAlign: 'center'}}>
                    <tr>
                        <td>{SubCategoriaItem.id}</td>
                        <td>{SubCategoriaItem.name}</td>
                        <td>{SubCategoriaItem.alias}</td>
                        <td>{RetornaNomeCategoria([SubCategoriaItem.id])}</td>
                        <td>
                        <Link to={`/editarSubCategoria/${SubCategoriaItem.id}`} style={{paddingRight: '20px'}}>
                            <BotaoEditar/>
                        </Link>
                        <Link to='/listagemSubCategoria'>
                            <BotaoRemover onClick={ExcluirSubCategoria} Id={SubCategoriaItem.id} />
                        </Link>
                        </td>
                    </tr>
                </tbody>
            ))}
            </Table>
        </div>
  )
}