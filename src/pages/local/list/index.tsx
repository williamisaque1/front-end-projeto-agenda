import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import Axios from "axios";
interface localProps {
  id: number;
  cep: number;
  endereco: string;
  numero: number;
  bairro: string;
  complemento: string;
  cidade: string;
  estado: string;
}
interface informacoes {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}
interface uf {
  id: string;
  nome: string;
  sigla: string;
}
interface city {
  nome: string;
}

const Local: React.FC = () => {
  const [loading, setloading] = useState(true);
  const [local, setLocal] = useState<localProps[]>([]);
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [numero, setNumero] = useState(0);
  const [inf, setinf] = useState<uf[]>([]);
  const [uf, setUf] = useState("");
  const [info, setInfo] = useState<informacoes[]>([]);
  const [city, setcity] = useState<city[]>([]);

  async function getlocal() {
    const response = await api.get<localProps[]>("/local");
    setLocal(response.data);
    setloading(false);
  }
  async function getinfo() {
    const response = await Axios.get<informacoes[]>(
      `https://viacep.com.br/ws/12060620/json/`
    );
    setInfo(response.data);
  }
  async function getuf() {
    const response = await Axios.get<uf[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    setinf(response.data);
    
  }
  async function getcity() {
    console.log("vfv" + uf);
    const response = await Axios.get<uf[]>(
      ` https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`
    );
    console.log(response.data + "vfaav" + uf);
    setcity(response.data);
  }

  useEffect(() => {
    getlocal();
    getinfo();
    getuf();
  }, []);

 
  useEffect(() => {
    getcity()
  },[uf])

  


  return (
    <div id="page-create-point">
      <form>
        <h1> local</h1>
        {!loading ? (
          <fieldset>
            {local.length > 0 ? (
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
                    <th></th>
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
            ) : (
              <p> agenda não possui contatos </p>
            )}
          </fieldset>
        ) : (
          <div>
            <br />
            <br />
            <div className="spinner"></div>
            <br />
            <p>carregando ...</p>
          </div>
        )}
        <br />
        <br />
        <br /> 
        <br />
        <h2> cadastrar </h2>
        <br />
        <br />
        <div className="field-group">
          <div className="field">
            <label htmlFor="cep"> CEP </label>
            <input
              onChange={(text) => setCep(text.currentTarget.value)}
              type="text"
              name="cep"
              id="cep"
            />
          </div>

          <div className="field">
            <label htmlFor="logradouro">RUA</label>
            <input
              onChange={(text) => setLogradouro(text.currentTarget.value)}
              type="text"
              name="logadouro"
              id="lougadoro"
            />
          </div>
        </div>

        <div className="field-group">
          <div className="field">
            <label htmlFor="numero"> numero </label>
            <input
              onChange={(text) => setNumero(Number(text.currentTarget.value))}
              type="text"
              name="numero"
              id="numero"
            />
          </div>

          <div className="field">
            <label htmlFor="bairro">Bairro</label>
            <input
              onChange={(text) => setBairro(text.currentTarget.value)}
              type="text"
              name="bairro"
              id="bairro"
            />
          </div>
        </div>

        <div className="field-group">
          <div className="field">
            <label htmlFor="cidade"> cidade </label>
   {  
   uf !== '' ? (
            <select
              name="cidade"
              id="cidade"
              onChange={(text) =>  setLocalidade(text.currentTarget.value)}
            >
              <option defaultValue="default" value="cidade">
                --Cidade
              </option>
              {city.map((cidades) => (
                <option key="cidade" value={localidade}>
                  {cidades.nome} {console.log(uf + "" + cidades.nome)}
                </option>
              ))}
            </select>
   ) :   <div className="field-group">
   <div className="field">
   <select disabled >
    <option defaultValue="default" value="cidade" >
   --CIDADE
 </option>
 </select>
 </div>
 </div>
              }
          </div>

          <div className="field">
            <label htmlFor="estado">estado</label>
            <select
              defaultValue="default"
              onChange={(text ) =>  setUf(text.currentTarget.value)}
              name="estado"
              id="estado"
            >
              <option key="default" value="estado">
                -- ESTADO
              </option >

              {inf.map((ufinfo) => (
                
                <option key={ufinfo.sigla} value={ufinfo.sigla} >
                 
                  {ufinfo.nome} {console.log(uf + "gggg")} 
                  
                
                </option>
                
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Local;
