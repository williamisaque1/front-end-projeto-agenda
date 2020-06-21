import React, { useState, useEffect } from "react";
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
 
    async function getEvento() {
        const response = await api.get<EventoProps[]>("/evento")
        setevento(response.data);
        setloading(false); 
    }
    useEffect(() => {
        getEvento();

    }, [])
    return (
        <div id="page-create-point">
            <form>
                <h1> Eventos</h1>
                {!loading ? (<fieldset>
                    <table>
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
                                    <td>{event.datahora}</td>
                                    <td>{event.idlocal}</td>
                                    <td>{event.qtdeparticipantes}</td>

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
export default Evento;



