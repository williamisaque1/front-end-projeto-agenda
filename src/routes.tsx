import React from "react"; //acessar sem ser por defalut abre chaves {}
import {BrowserRouter,Route} from 'react-router-dom';    //quando e arquivo que comeca @types posso usa flag -D vai para desenvolvimento n para producao
import Home from "./pages/Home/index"
import ListaContatos  from "./pages/contato/List/index"
import TipoContato from "./pages/tipoContato/list/index";
import Evento from "./pages/evento/list/index";
import Local from "./pages/local/list/index";
const Routes : React.FC = () =>{  //para ver oque tem dentro router dom abaixa o tipagem rect router dom
return (
    <BrowserRouter>
    <Route component = {Home} path = "/" exact />
    <Route component = {ListaContatos} path = "/contato/lista" exact />
    <Route component = {TipoContato} path = "/tipocontato/lista" exact />
    <Route component = {Evento} path = "/evento/lista" exact />
    <Route component  = {Local} path = "/local/lista" exact />
    </BrowserRouter>
)
}
export default Routes;