import React, { useState, useEffect } from "react"; //use state conceito de imutabilidade
import api from "../../../services/api" //useeffect podemos agendar quando uma funcao seja executada
interface ContatoProps {
    id: number
    nome: string
    email: string
    telefone: string
    idlocal: number
    idtipocontato: number

}  //funcionalidade typescript interface para saber as propriedades do retorno da api
const ListaContatos: React.FC = () => { // que tipo cont vai ser (typescript) quando tem
    // html com javascript  o tipo react.fc fc = functioncomponent e um componente do react que esta representado como uma funcao
    // um jeito dentro usestage colocar do lado vetor 'AS nome da interface '
    const [loading, setloading] = useState(true); // true pagina vai comecar carregando, so vai ser falso quando terminar aa requisicao
    const [contatos, setContatos] = useState<ContatoProps[]>([]) //dessetrurizacao por [] //baixair o axios
    //criando um vetor vazio , que vai ter esse tipo contatoprops , que vai ser um vetor de objetos
    async function getcontatos() {
        const response = await api.get<ContatoProps[]>("/contato")//vai ter essa interface , passar por parametro<> essa e uma funcionalidade javascript
        setContatos(response.data);
        setloading(false);
    }
    useEffect(() => {
        getcontatos();
        //useeffect nao pode ser assincrono, para ter uma funcao assincrona faz a funcao assincronaseparada
    }, []) //coloca o [] coloca as variaveis que cada vez que for modificado a funcao sera rodada novamente
    return (
        <div id="page-create-point">
            <form>
                <h1> Lista de contatos</h1>
                {!loading ? (<fieldset>
                    <table>
                        <tbody>
                            <tr>
                                <th> Id </th>
                                <th> Nome</th>
                                <th>E-Mail</th>
                                <th> Telefone </th>
                                <th> Id Local </th>
                                <th> Id TipoContato </th>
                             
                            </tr>
                            {contatos.map((contatc) => ( //quando e delimitada por {} ela tem corpo e tem que dar o return
                                //para escrever javascript dentro de html tem que colocar{}
                                //ira retornar o oque ta dentro de map que é contato , tipo ter um return implicito depois de =>
                                //map pede no componente mãe estabelece uma propriedade key , para diferenciar cada elemento que for gerado
                                <tr key={contatc.id}>
                                    <td>{contatc.id}</td>
                                    <td>{contatc.nome}</td>
                                    <td>{contatc.email}</td>
                                    <td>{contatc.telefone}</td>
                                    <td> {contatc.idlocal}</td>
                                    <td>{contatc.idtipocontato}</td> 
                    
                                   
                                </tr>

                            ))}

                        </tbody>
                    </table>
                   </fieldset>

                ) : (<div>
                    <br />
                    <br />
                    <p>carregando ...</p>
                </div>)
                }
                


            </form>
        </div>
    )
}
export default ListaContatos;
