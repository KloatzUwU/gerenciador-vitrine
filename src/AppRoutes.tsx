import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaListagemCategoria from './pages/Categoria/PaginaListagemCategoria';
import PaginaPadrao from './pages/Padrao/PaginaPadrao';
import PaginaCriarCategoria from './pages/Categoria/PaginaCriarCategoria';
import PaginaEditarCategoria from './pages/Categoria/PaginaEditarCategoria';

function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<PaginaPadrao/>}/>
      <Route path='listagemCategoria' element={<PaginaListagemCategoria/>}/>
      <Route path='criarCategoria' element={<PaginaCriarCategoria/>}/>
      <Route path='editarCategoria/:id' element={<PaginaEditarCategoria/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;