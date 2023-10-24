import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaListagemCategoria from './pages/Categoria/PaginaListagemCategoria';
import PaginaPadrao from './pages/Padrao/PaginaPadrao';
import PaginaCriarCategoria from './pages/Categoria/PaginaCriarCategoria';
import PaginaEditarCategoria from './pages/Categoria/PaginaEditarCategoria';
import PaginaListagemSubCategoria from './pages/SubCategoria/PaginaListagemSubCategoria';
import PaginaCriarSubCategoria from './pages/SubCategoria/PaginaCriarSubCategoria';
import PaginaEditarSubCategoria from './pages/SubCategoria/PaginaEditarSubCategoria';
import PaginaListagemSegmento from './pages/Segmento/PaginaListagemSegmento';
import PaginaCriarSegmento from './pages/Segmento/PaginaCriarSegmento';
import PaginaEditarSegmento from './pages/Segmento/PaginaEditarSegmento';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PaginaPadrao/>}/>
        <Route path='listagemCategoria' element={<PaginaListagemCategoria/>}/>
        <Route path='criarCategoria' element={<PaginaCriarCategoria/>}/>
        <Route path='editarCategoria/:id' element={<PaginaEditarCategoria/>}/>
        <Route path='listagemSubCategoria' element={<PaginaListagemSubCategoria/>}/>
        <Route path='criarSubCategoria' element={<PaginaCriarSubCategoria/>}/>
        <Route path='editarSubCategoria/:id' element={<PaginaEditarSubCategoria/>}/>
        <Route path='listagemSegmento' element={<PaginaListagemSegmento/>}/>
        <Route path='criarSegmento' element={<PaginaCriarSegmento/>}/>
        <Route path='editarSegmento/:id' element={<PaginaEditarSegmento/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
