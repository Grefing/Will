import { Route, Routes } from "react-router-dom";
import Favoritos from "../views/Favoritos";
import VerDespues from "../views/VerDespues";


const RutasUsuario = ({usuarioLogueado}) => {
    return (
        <>
            <Routes>
                <Route exact path="/favoritos" element={<Favoritos usuarioLogueado={usuarioLogueado}></Favoritos>}></Route> 
                <Route exact path="/seeLater" element={<VerDespues usuarioLogueado={usuarioLogueado}></VerDespues>}></Route> 
            </Routes>  
        </>
    );
};

export default RutasUsuario;