import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";

import styled from "styled-components";

function Home() {
    const { token } = useContext(UserContext);
    const [registros, setRegistros] = useState([]);
    let entrada = 0;
    let saida  = 0;

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


    function listarRegistros() {
        return  (
            <div className="registro-valores">
                {registros.map((registro, index) => {
                    if (registro.tipo === "Entrada") {
                        entrada = entrada - registro.valor;
                    }                     
                    if (registro.tipo === "Saída"){
                        saida -= registro.valor            
                    }
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
                <div className="saldo">
                    <p>SALDO</p>
                    <p>{(entrada * (-1)) + saida}</p>
                </div>
               
            </div>            
            
        )
    }    
    
    return (
        <Contanier>
            <div className="header">
                <p>Olá, {registros[registros.length -1]}</p>
                <button>deslogar</button>
            </div>
            <div className="registros">{listarRegistros()}</div>
            <div className="buttons">
                <Div>
                    <StyledLink to="/entrada"><ion-icon name="add-circle-outline"></ion-icon></StyledLink>
                    <p>Nova entrada</p>
                </Div>
                <Div>
                    <StyledLink to="/saida"><ion-icon name="remove-circle-outline"></ion-icon></StyledLink> 
                    <p>Nova saída</p>  
                </Div>
            </div>
        </Contanier>
    );
}

const Contanier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;

    .header {
        width: 326px;
        margin-left: 25px;
        margin-right: 25px;
        display: flex;
        justify-content: space-between;
    }

    .header p {
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #ffffff;
    }

    .registros {
        margin-top: 22px;
        width: 326px;
        height: 446px;
        background-color: #FFFFFF;
        border-radius: 5px;
    }

    .registro-info {
        display: flex;
        justify-content: space-between;
    }

    .registro-info .data-descricao {
        display: flex;
    }

    .saldo {
        display: flex;
        justify-content: space-between;
    }

    .buttons {
        width: 326px;
        display: flex;
        justify-content: space-between;
        margin-top: 13px;
    }

    ion-icon {
        width: 21.88px;
        height: 21.88px;
        color: #ffffff;
        border-radius: 100%;
        margin: 10.56px 123.56px 0 9.56px;
        background-color: #A328D6;
    }
`;

const StyledLink = styled(Link)`
    background-color: #A328D6;
`;

const Div = styled.div`
    width: 155px;
    height: 114px;
    background-color: #A328D6;
    border-radius: 5px;

    p {
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        background-color: #A328D6;
        width: 64px;
        height: 40px;
        margin-top: 32px;
        margin-left: 10px;

    }
`;


export default Home;

