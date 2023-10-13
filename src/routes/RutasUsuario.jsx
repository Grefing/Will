import { Route, Routes } from "react-router-dom";
import Favoritos from "../views/Favoritos";
import VerDespues from "../views/VerDespues";
import Perfil from "../views/Perfil";


const RutasUsuario = ({usuarioLogueado, setRender, render, theme}) => {
    return (
        <>
            <Routes>
                <Route exact path="/favoritos" element={<Favoritos usuarioLogueado={usuarioLogueado} backgroundColor={theme ? "white" : "#121314"}></Favoritos>}></Route> 
                <Route exact path="/seeLater" element={<VerDespues usuarioLogueado={usuarioLogueado} backgroundColor={theme ? "white" : "#121314"}></VerDespues>}></Route> 
                <Route exact path='/perfil' element={<Perfil usuarioLogueado={usuarioLogueado} render={render} setRender={setRender} backgroundColor={theme ? "white" : "#121314"}></Perfil>}></Route>
            </Routes>  
        </>
    );
};

export default RutasUsuario;