import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

function Login() {
    const { setToken } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    
    async function fazerLogin(event) {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/sign-in", {email, senha});
            setToken(response.data);
            navigate("/home");
        }catch(e) {
            alert(e.response.data);
        }

    } 
    return (
      <Contanier>
          <h1>MyWallet</h1>
          <form>
              <input type="email" placeholder="E-mail" value={email} required onChange={(e) => setEmail(e.target.value)}></input>
              <input type="password" placeholder="Senha" value={senha} required onChange={(e) => setSenha(e.target.value)}></input>
              <button type="button" onClick={fazerLogin}>Entrar</button>
              <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
          </form>
      </Contanier>
    ) 
    
}

const Contanier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 159px 25px 192px 25px;

    h1 {
        font-family: "Saira Stencil One";
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #ffffff;
    }

    form {
    display: flex;
    flex-direction: column;
    margin-top: 24px;;
    }

    input {
        margin-bottom: 13px;
        background-color: #ffffff;
        border-radius: 5px;
        border: none;
        height: 58px;
        width: 326px;
        padding-left: 15px;
    }

    input::placeholder {
        font-size: 20px;
        line-height: 23px;
        font-weight: 400;
        color: #000000;
    }

    button {
        background-color: #A328D6;
        border-radius: 5px;
        border: none;
        text-align: center;
        width: 326px;
        height: 46px;
        color: #ffffff;
        margin-bottom: 36px;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
    }
`;

const StyledLink = styled(Link)`
    font-family: 'Raleway', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
`;

export default Login;
