import { Route, Routes } from "react-router-dom";
import Favoritos from "../views/Favoritos";
import VerDespues from "../views/VerDespues";
import Perfil from "../views/Perfil";


const RutasUsuario = ({usuarioLogueado, setRender, render}) => {
    return (
        <>
            <Routes>
                <Route exact path="/favoritos" element={<Favoritos usuarioLogueado={usuarioLogueado}></Favoritos>}></Route> 
                <Route exact path="/seeLater" element={<VerDespues usuarioLogueado={usuarioLogueado}></VerDespues>}></Route> 
                <Route exact path='/perfil' element={<Perfil usuarioLogueado={usuarioLogueado} render={render} setRender={setRender}></Perfil>}></Route>
            </Routes>  
        </>
    );
};

export default RutasUsuario;