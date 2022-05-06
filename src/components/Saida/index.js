import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function Saida() {
  const { token } = useContext(UserContext);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  async function salvarSaida(event) {
      event.preventDefault();
      try {
        await axios.post("http://localhost:5000/registros", {valor, descricao, tipo: "Saída"}, config);
      }catch(e) {
          console.log("Não foi possível registrar a saída");
      }
  }

  return (
    <>
      <p>Nova Saida</p>
      <form onSubmit={salvarSaida}>
        <input type="text" placeholder="Valor" value={valor} required onChange={(e) => setValor(e.target.value)}></input>
        <input type="text" placeholder="Descrição" value={descricao} required onChange={(e) => setDescricao(e.target.value)}></input>
        <Link to="/home"><button type="submit">Salvar Saída</button></Link>
      </form>
    </>
  );
}

export default Saida;
