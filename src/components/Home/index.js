import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

import loginOutline from "../../assets/img/login-outline.svg"

function Home() {
    const { token, setToken } = useContext(UserContext);
    const [registros, setRegistros] = useState([]);
    const navigate = useNavigate();
    let entrada = 0;
    let saida  = 0;
    let saldo = 0;

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
        return  registros.length > 1 ? (
            <Registros>
                {registros.map((registro, index) => {
                    if (registro.tipo === "Entrada") {
                        entrada = entrada - registro.valor;
                    }                     
                    if (registro.tipo === "Saída"){
                        saida -= registro.valor          
                    }
                    if (index === registros.length - 1) {
                        saldo = (entrada * (-1)) + saida; 
                    }
                    return (
                        <div className="registro-info" key={index}>
                            <div className="data-descricao">
                                <p className="data">{registro.data}</p>
                                <p className="descricao">{registro.descricao}</p>
                            </div>                            
                            <RegistroValor cor={registro.tipo === "Entrada" ? "#03AC00" : "#C70000"}>{registro.valor}</RegistroValor>
                        </div>
                    )
                })}
                <div className="saldo-background">
                    <Saldo>
                        <p className="saldo-texto">SALDO</p>
                        <SaldoValor cor={saldo >= 0 ? "#03AC00" : "#C70000"}>{saldo.toFixed(2)}</SaldoValor>
                    </Saldo>
                </div>   
            </Registros>            
            
        ) : 
        (
            <Registros>
                <SemRegistros>Não há registros de entrada ou saída</SemRegistros>
            </Registros>
        )
    }    

    // function deslogar() {
    //     setToken("");
    //     navigate("/");
    // }

    return (
        <Contanier>
            <Header>
                <p>Olá, {registros[registros.length -1]}</p>
                <img src={loginOutline} alt="deslogar"onClick={() => {
                     setToken("");
                     navigate("/");
                }}/>
            </Header>
            <Main>{listarRegistros()}</Main>
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

const Header = styled.div`
    font-family: 'Raleway';
    width: 326px;
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    justify-content: space-between;

    p {
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #ffffff;
    }

    img {
        width: 23px;
        height: 24px;
    }
`;

const Contanier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;

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

const Main = styled.div`
    width: 326px;
    height: 446px;
    margin-top: 22px;

    p {
        background-color: #FFFFFF;
        z-index: 7;
    }
`;

const Registros = styled.div`
    font-family: 'Raleway';
    padding: 5px 11px 10px 12px;
    width: 326px;
    height: 446px;
    border-radius: 5px;
    background-color: #ffffff;

    .registro-info {
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
        background-color: #ffffff;

    }

    .registro-info .data-descricao {
        display: flex;
        background-color: #ffffff;
    }

    .data {
        color: #C6C6C6;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        margin-right: 10px;
    }

    .descricao {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }

    .saldo-background {
        background-color: #FFFFFF;
        position: absolute;
        top: 450px;
    }
`;

const RegistroValor = styled.p`
    color: ${props => props.cor};
`;

const SemRegistros = styled.p`
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    width: 180px;
    height: 46px;
    margin: 200px 73px 200px 73px;
`;

const Saldo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 305px;
    background-color: #FFFFFF;
    margin-top: 40px;
    position: relative;
    

    .saldo-texto {
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }

`;

const SaldoValor = styled.p`
    color: ${props => props.cor};
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

