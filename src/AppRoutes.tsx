import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaListagem from './pages/PaginaListagem';
import PaginaCriar from './pages/PaginaCriar';
import PaginaPadrao from './pages/PaginaPadrao';

function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<PaginaPadrao/>}/>
      <Route path='listagem' element={<PaginaListagem/>}/>
      <Route path='criar' element={<PaginaCriar/>}/>
      <Route path='editar:id'/>
    </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
