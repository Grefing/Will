import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from './common/Menu';
import Footer from './common/Footer';
import Inicio from './views/Inicio';
import Registro from './views/Registro';
import Login from './views/Login';
import DetallePelicula from './views/DetallePelicula';
import ResultadoBusqueda from './views/ResultadoBusqueda';
import Eror404 from './views/Eror404';
import { useState } from 'react';
import RutasProtegidas from './routes/RutasProtegidas';
import RutasUsuario from './routes/RutasUsuario';



function App() {
  const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario')) || {}
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioLocalStorage)

  return (
    <BrowserRouter>
        <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></Menu>
        <Routes>  
        <Route exact path="/" element={<Inicio></Inicio>}></Route>
        <Route exact path="/registro" element={<Registro setUsuarioLogueado={setUsuarioLogueado}></Registro>}></Route>
        <Route exact path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>}></Route>
        <Route exact path='/detalles/:type/:id' element={<DetallePelicula usuarioLogueado={usuarioLogueado}></DetallePelicula>}></Route>
        <Route exact path='/resultado-busqueda/:type/:result' element={<ResultadoBusqueda></ResultadoBusqueda>}></Route>
        <Route path='/user/*' element={
          <RutasProtegidas>
            <RutasUsuario usuarioLogueado={usuarioLogueado}></RutasUsuario>
          </RutasProtegidas>
        }></Route>
        <Route exact path='*' element={<Eror404></Eror404>}></Route>
        </Routes>
        <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
