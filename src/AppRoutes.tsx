import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaListagemCategoria from './pages/PaginaListagemCategoria';
import PaginaPadrao from './pages/PaginaPadrao';
import PaginaCriarCategoria from './pages/PaginaCriarCategoria';
import PaginaEditarCategoria from './pages/PaginaEditarCategoria';
import PaginaListagemSubCategoria from './pages/PaginaListagemSubCategoria';
import PaginaCriarSubCategoria from './pages/PaginaCriarSubCategoria';
import PaginaEditarSubCategoria from './pages/PaginaEditarSubCategoria';

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
    </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;