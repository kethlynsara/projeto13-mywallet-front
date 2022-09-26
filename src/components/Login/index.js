import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import 'react-toastify/dist/ReactToastify.min.css';
import UserContext from "../../contexts/UserContext";
toast.configure();

function Login() {
    const { setToken } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    async function fazerLogin(event) {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, {email, senha});
            setToken(response.data);
            const serializedData = JSON.stringify(response.data);
            localStorage.setItem("token", serializedData);
            navigate("/home");
        }catch(e) {
            toast("Confira seus dados!");
            setLoading(false);
        }

    } 
    return (
      <Contanier>
          <h1>MyWallet</h1>
          <form>
              <input type="email" placeholder="E-mail" value={email} required onChange={(e) => setEmail(e.target.value)}></input>
              <input type="password" placeholder="Senha" value={senha} required onChange={(e) => setSenha(e.target.value)}></input>
              
              {!loading ? 
                <button type="button" onClick={fazerLogin}>Entrar</button>
                :
                <LoadingDiv>
                    <p>Entrar</p>
                    <Oval color="#FCF6FE" width={20} />
                </LoadingDiv>
                }

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
        margin-top: 24px;
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

        :hover {
            cursor: pointer;
        }
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

const LoadingDiv = styled.div`
    font-family: 'Raleway', sans-serif;
    background-color: #A328D6;
    border-radius: 5px;
    border: none;
    width: 326px;
    height: 46px;    
    margin-bottom: 36px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    p {
        margin-right: 10px;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #ffffff;
    }
`;

export default Login;
