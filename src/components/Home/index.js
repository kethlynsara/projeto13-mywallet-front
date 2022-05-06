import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";

import styled from "styled-components";

function Home() {
    const { token, setToken } = useContext(UserContext);
    const [registros, setRegistros] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function getRegistros() {
        try {
            const response = await axios.get("http://localhost:5000/registros", config);
            const { data } = response;
            setRegistros(data);

        }catch(e) {
            console.log("não deu bom no get registros", e.response);
        }
        
    }

    useEffect(() => getRegistros(), []);


    registros.map(e => console.log(e))
    console.log(registros[registros.length -1])

    function listarRegistros() {
        return  (
            <Registros>
                {registros.map((registro, index) => {
                    return (
                        <div className="registro-info" key={index}>
                            <div className="data-descricao">
                                <p>{registro.data}</p>
                                <p>{registro.descricao}</p>
                            </div>                            
                            <p>{registro.valor}</p>
                        </div>
                    )
                })}
               <p>SALDO</p>
            </Registros>            
            
        )
    }
    
    
    return (
        <>
            <div>
                <p>Olá, {registros[registros.length -1]}</p>
                {listarRegistros()}
                <button>deslogar</button>
            </div>
            <Buttons className="buttons">
                <Div><Link to="/entrada"><button>+</button></Link></Div>
                <Div><Link to="/saida"><button>-</button></Link></Div>
            </Buttons>
        </>
    );
}

const Div = styled.div`
    width: 50px;
    height: 50px;
    background-color: #ffffff;
`;
const Buttons = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`;

const Registros = styled.div`
    .registro-info {
        display: flex;
        justify-content: space-between;
    }

    .registro-info .data-descricao {
        display: flex;
    }
`;
export default Home;

