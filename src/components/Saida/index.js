import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate  } from "react-router-dom";

import styled from "styled-components";

function Saida() {
  const { token } = useContext(UserContext);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  async function salvarSaida(event) {
      event.preventDefault();
      try {
        await axios.post("http://localhost:5000/registros", {valor, descricao, tipo: "Saída"}, config);
        navigate("/home");
      }catch(e) {
          console.log("Não foi possível registrar a saída");
      }
  }

  return (
    <Contanier>
      <h1>Nova Saída</h1>
      <form>
        <input type="text" placeholder="Valor" value={valor} required onChange={(e) => setValor(e.target.value)}></input>
        <input type="text" placeholder="Descrição" value={descricao} required onChange={(e) => setDescricao(e.target.value)}></input>
        <button type="submit" onClick={salvarSaida}>Salvar Saída</button>
      </form>
    </Contanier>
  );
}

const Contanier = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 24px 383px 24px;

    h1 {
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
    }
`;

export default Saida;
