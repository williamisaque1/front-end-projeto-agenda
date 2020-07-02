import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api"
interface EventoProps {
    id: number,
    nome: string,
    datahora: Date,
    idlocal: number,
    qtdeparticipantes: number
}

const Evento: React.FC = () => {

    const [loading, setloading] = useState(true);
    const [evento, setevento] = useState<EventoProps[]>([])
  const [nome,setnome] = useState("");
  const [dataHora,setDataHora] = useState('yyyy-mm-dd 00:00:00');
  const [idlocal,setidlocal] = useState(0);
  const [qtdeparticipantes,setqtdeParticipantes] = useState(0);

    async function getEvento() {
        const response = await api.get<EventoProps[]>("/evento")
        setevento(response.data);
        setloading(false);
    }
    function formateDate(value:string){
        var option = {year:"numeric",month:"long",day:"numeric", hour:"numeric" , minute:"numeric" };
       
        return new Date(value).toLocaleDateString([],option);
    }
  
    async function insertEvento (e:FormEvent){
        e.preventDefault();
       /* var datahora = Datahora.getFullYear() + "/" + ( "0" + (Datahora.getMonth() +1)).substr(-2) + "/" + ("0" + Datahora.getDate()).substr(-2) */
     /*   const datahora = new Date (dataHora)
        datahora.setHours(datahora.getHours()-3);*/
      const  datahoras =  formateDate(dataHora);
        const datahora = new Date (datahoras)
  alert("oque foi antes de formatar" + dataHora + "formatado" + datahora );
        const response = await api.post("/evento",{

            nome,
           datahora,
            idlocal,
            qtdeparticipantes

        });
        
        if (response.data.message === "cadastrado"){
            alert(`Evento adicionado  ${nome}`);
            window.location.reload();
        }else{
            alert("erro ao adicionar o Evento");
        }
        
    };
    async function deleteEvento(e:FormEvent,id:number,Nome:string){
        e.preventDefault();
      const response = await api.delete(`/evento/${id}`);
        if (response.data.message === "excluido"){
            alert(`O Evento ${Nome} + ${id} foi excluido  `);
            window.location.reload();

        }else{
            alert ("Erro ao excluir O Evento");
        }
    }
   

    useEffect(() => {
        getEvento();

    }, [])
    return (
        <div id="page-create-point">
            <form>
                <h1> Eventos</h1>
                {!loading ? (
                    <fieldset>
                        {
                            evento.length > 0 ? (<table>
                                <tbody>
                                    <tr>
                                        <th>id</th>
                                        <th>nome</th>
                                        <th>datahora</th>
                                        <th>idlocal</th>
                                        <th>qtdeparticipantes</th>
                                    </tr>
                                    {evento.map((event) => (

                                        <tr key={event.id}>
                                            <td>{event.id}</td> 
                                            <td>{event.nome}</td>
                                            <td>{ event.datahora}</td>
                                            <td>{event.idlocal}</td>
                                            <td>{event.qtdeparticipantes}</td>
                                            <td> <button onClick = {(e) => deleteEvento(e,event.id , event.nome) }>excluir</button> </td> 
                                       

                                        </tr>

                                    ))}
                               
                                </tbody>
                            </table>) : (<p> a agenda não possui eventos</p>)
                        }
                    </fieldset>

                ) : (<div>
                    <br />
                    <br />
                    <p>carregando ...</p>
                </div>)
                }
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>cadastrar</h2>
                <br/>
                <br/>
                <div className = "field-grupo">
                    <div className="field">
                        <label htmlFor="nome"> Nome </label>
                        <input onChange = {(text) => setnome(text.currentTarget.value)}/>
                    </div>
                    <div className="field">
                        <label htmlFor="datahora"> Data-Hora </label>
                        <input type="datetime-local"  name = 'calendario' onChange = {(text) => setDataHora(text.currentTarget.value)} />
                    
                        
                    </div>
                </div>
                <div className = "field-grupo">
                    <div className="field">
                        <label htmlFor="idlocal"> Idlocal </label>
                        <input onChange = {(text) => setidlocal( Number(text.currentTarget.value))}/>
                    </div>
                    <div className="field">
                        <label htmlFor="qtdeparticipantes"> QtdeParticipantes </label>
                        <input onChange = {(text) => setqtdeParticipantes (Number(text.currentTarget.value))}/>
                    </div>
                </div>
                
              <button onClick = {(e) => insertEvento(e)} > Cadastrar </button>
            </form>
        </div>
    );
};
export default Evento;



