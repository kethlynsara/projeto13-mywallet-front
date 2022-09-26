import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

function Entrada() {
    const localStorageData = localStorage.getItem("token");
    const token = JSON.parse(localStorageData);
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function salvarEntrada(event) {
        event.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_API_URL + "/registros", {valor, descricao, tipo: "Entrada"}, config);
            navigate("/home");
        }catch(e) {
            toast("Não foi possível registrar a entrada");
        }
    }
    return (
        <Contanier>
            <h1>Nova Entrada</h1>
            <form>
                <input type="text" placeholder="Valor" required onChange={(e) => setValor(e.target.value)}></input>
                <input type="text" placeholder="Descrição" required onChange={(e) => setDescricao(e.target.value)}></input>
                <button type="submit" onClick={salvarEntrada}>Salvar Entrada</button>
            </form>
        </Contanier>
    );
}

const Contanier = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 24px 383px 24px;

    h1 {
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #ffffff;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
    }

    input {
            height: 58px;
            background: #FFFFFF;
            border-radius: 5px;
            border: none;
            margin-bottom: 13px;
            padding-left: 15px;
    }

    input::placeholder {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }

    button {
        height: 46px;
        background-color: #A328D6;
        border-radius: 5px;
        border: none;
        text-align: center;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #ffffff;

        :hover {
            cursor: pointer;
        }
    }
`;

export default Entrada;