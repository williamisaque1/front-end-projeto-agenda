import React, { useState, useEffect } from "react";
import api from "../../../services/api"
interface TipoContatoProps {
    id: number
   descricao:string;
}

const TipoContatos: React.FC = () => {

    const [loading, setloading] = useState(true);
    const [tipocontatos, settipoContatos] = useState<TipoContatoProps[]>([])

    async function getTipocontatos() {
        const response = await api.get<TipoContatoProps[]>("/tipocontato")
        settipoContatos(response.data);
        setloading(false);
    }
    useEffect(() => {
        getTipocontatos();

    }, [])
    return (
        <div id="page-create-point">
            <form>
                <h1> Lista de contatos</h1>
                {!loading ? (<fieldset>
                    <table>
                        <tbody>
                            <tr>
                                <th> Id </th>
                               <th> descrição </th>

                            </tr>
                            {tipocontatos.map((contatc) => (

                                <tr key={contatc.id}>
                                  <td>{contatc.id}</td>
                                    <td>{contatc.descricao}</td>
                                    


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
export default TipoContatos;



