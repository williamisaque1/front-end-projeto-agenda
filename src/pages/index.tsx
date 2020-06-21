import React from "react";
import {IoMdContact,IoMdContacts} from "react-icons/io";
import {MdPlace,MdEvent} from "react-icons/md";
import {RiContactsLine} from "react-icons/ri"
const Home: React.FC = () =>{
    return (
        <div id ="page-create-point">
            <form>
            <h1> bem vindo a agenda do will ;) </h1>
            <br/>
            <br/>
            <br/>
            <ul className = "items-grid">
                <li >
                 <IoMdContact size = {80} />
                 <span>Contatos</span>
                </li>
                <li >
                 <MdPlace size = {80} />
                 <span>Locais</span>
                </li> 
                 <li >
                 <MdEvent  size = {80} />
                 <span>Eventos</span>
                </li>
                <li >
                 <RiContactsLine size = {80} />
                 <span>Tipos de Contato</span>
                </li>
                <li >
                 <IoMdContacts size = {80} />
                 <span>Participantes de eventos </span>
                </li>
            </ul>
            </form>
        </div>
    )

}; 
export default Home;