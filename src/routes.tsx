import React from "react"; //acessar sem ser por defalut abre chaves {}
import {BrowserRouter,Route} from 'react-router-dom';    //quando e arquivo que comeca @types posso usa flag -D vai para desenvolvimento n para producao
import Home from "./pages/Home/index"
import ListaContatos  from "./pages/contato/List/index"
const Routes : React.FC = () =>{  //para ver oque tem dentro router dom abaixa o tipagem rect router dom
return (
    <BrowserRouter>
    <Route component = {Home} path = "/" exact />
    <Route component = {ListaContatos} path = "/contato/lista" exact />
    </BrowserRouter>
)
}
export default Routes;