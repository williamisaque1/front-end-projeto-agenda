
import Axios from "axios";
//acessar as variaveis de ambiente cria arquivo .env , e acessa pelo axios a url do back end q esta na variavel de ambiente 
const api = Axios.create({
    baseURL: process.env.REACT_APP_API_URL //pegar requisisoes do objeto baseurl
});
export default api;
