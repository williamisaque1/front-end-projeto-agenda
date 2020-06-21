import React, { useState, useEffect } from "react";
import api from "../../../services/api"
interface localProps {
    id: number,
 cep:number,
  endereco:string,
   numero:number,
    bairro:string,
     complemento:string,
      cidade:string,
       estado:string
}

const Local: React.FC = () => {

    const [loading, setloading] = useState(true);
    const [local, setLocal] = useState<localProps[]>([]) 
    async function getlocal() {
        const response = await api.get<localProps[]>("/local")
        setLocal(response.data);
        setloading(false); 
    }
    useEffect(() => {
        getlocal();

    }, [])
    return (
        <div id="page-create-point">
            <form>
                <h1> local</h1>
                {!loading ? (<fieldset>
                    <table>
                        <tbody>
                            <tr>
                                
                               <th>id</th> 
                                <th>cep</th>
                                <th>endereco</th>
                                 <th>numero</th>
                               <th>bairro</th>
                               <th>complemento</th>
                               <th>cidade</th>
                               <th>estado</th>
                            </tr>
                            {local.map((locals) => (

                                <tr key={locals.id}>
                                    <td>{locals.id}</td>
                                    <td>{locals.cep}</td>
                                    <td>{locals.endereco}</td>
                                    <td>{locals.numero}</td>
                                    <td>{locals.bairro}</td>
                                    <td>{locals.complemento}</td>
                                    <td>{locals.cidade}</td>
                                    <td>{locals.estado}</td>

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
export default Local;



