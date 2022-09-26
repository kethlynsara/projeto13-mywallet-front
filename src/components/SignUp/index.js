import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
toast.configure();

function SignUp() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha1, setSenha1] = useState("");
    const [senha2, setSenha2] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

     async function cadastrar(event) {
        event.preventDefault();
        try {
            setLoading(true);
            await axios.post(process.env.REACT_APP_API_URL + "/sign-up", {
                nome,
                email,
                senha1,
                senha2
            });
            navigate("/");
        }catch(e) {
            toast('Confira seus dados!');
            setLoading(false);
        }
    }

    return (
        <Container>
            <h1>MyWallet</h1>
            <form>
                <input type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)}></input>
                <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Senha" required value={senha1} onChange={(e) => setSenha1(e.target.value)}></input>
                <input type="password" placeholder="Confirme a senha" required value={senha2} onChange={(e) => setSenha2(e.target.value)}></input>

                {!loading ? 
                <button type="submit" onClick={cadastrar}>Cadastrar</button> 
                :
                <LoadingDiv>
                    <p>Cadastrar</p>
                    <Oval color="#FCF6FE" width={20} />
                </LoadingDiv>
                }

                <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 95px 25px 114px 25px;

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
        margin-top: 28px;;
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

export default SignUp;