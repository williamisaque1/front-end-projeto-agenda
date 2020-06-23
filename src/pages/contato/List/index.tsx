import React, { useState, useEffect, FormEvent } from "react"; //use state conceito de imutabilidade
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
   const [nome,setnome] = useState ('');
   const [email,setemail] = useState ('');
   const [telefone,settelefone] = useState ('');
   const [idtipocontato,setIdtipocontato] = useState (0);
   const [idlocal,setIdlocal] = useState (0);
   
    //criando um vetor vazio , que vai ter esse tipo contatoprops , que vai ser um vetor de objetos
    async function getcontatos() {
        const response = await api.get<ContatoProps[]>("/contato")//vai ter essa interface , passar por parametro<> essa e uma funcionalidade javascript
        setContatos(response.data);
        setloading(false);
    }
    async function insertContatos(e:FormEvent){
        e.preventDefault();
        const response = await api.post("/contato",{
         nome,
         email,
         telefone,
         idlocal,
         idtipocontato
        });
        if(response.data.message === "cadastrado"){
            alert(`contato adicionado  ${nome}`);
            window.location.reload(true);
        }else{
            alert("erro ao adicionar contato");
        }

    }

    async function deletecontato(e: FormEvent, id: number, nome: string) {
        e.preventDefault();
  
        const response = await api.delete(`/contato/${id}`);
        if (response.data.message === "excluido") {
            alert(`contato excluido ${nome}`);
            window.location.reload();

        } else {
            alert('erro ao excluir o contato');
        }
    }
    useEffect(() => {
        getcontatos();
        //useeffect nao pode ser assincrono, para ter uma funcao assincrona faz a funcao assincronaseparada
    }, []) //coloca o [] coloca as variaveis que cada vez que for modificado a funcao sera rodada novamente
    return (
        <div id="page-create-point" >
            <form>
                <h1> Lista de contatos</h1>
                {!loading ? (
                    <fieldset>
                        {
                            contatos.length > 0 ? (<table>
                                <tbody>
                                    <tr>
                                        <th> Id </th>
                                        <th> Nome</th>
                                        <th>E-Mail</th>
                                        <th> Telefone </th>
                                        <th> Id Local </th>
                                        <th> Id TipoContato </th>
                                        <th></th>

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
                                            <td>   <button onClick={(e) => deletecontato(e, contatc.id, contatc.nome)}> apagar </button> </td>


                                        </tr>

                                    ))}

                                </tbody>
                            </table>) : (<p> a agenda não possui contatos cadastrados </p>)
                        }
                    </fieldset>

                ) : (<div>
                    <br />
                    <br />
                    <p>carregando ...</p>
                </div>)
                }
                <br />
                <br />
                <br />
                <br />
                <h2> cadastrar: </h2>
                <br />
                <br />
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="Nome"> Nome </label>
                        <input onChange = {(text) => setnome(text.currentTarget.value)} type="text" name="Nome" id="Nome" />

                    </div>
                    <div className="field">
                        <label htmlFor="email"> email </label>
                        <input onChange = {(text) => setemail(text.currentTarget.value)} type="text" name="E-mail" id="email" />

                    </div>
                </div>
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="telefone"> Telefone </label>
                        <input  onChange = {(text) => settelefone(text.currentTarget.value)} type="text" name="telefone" id="telefone" />

                    </div>
                    <div className="field">
                        <label htmlFor="idtipocontato"> id Tipo contato</label>
                        <input  onChange = {(text) => setIdtipocontato(Number(text.currentTarget.value))} type="text" name="idtipocontato" id="idtipocontato" />

                    </div>
                </div>
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="idlocal"> Id local </label>
                        <input  onChange = {(text) => setIdlocal(Number(text.currentTarget.value))} type="text" name="id local" id="tid local" />

                    </div>
                    </div>
<button onClick = {(e) => insertContatos(e)} > Cadastrar</button>
            </form>
        </div>

    );
};
export default ListaContatos;
