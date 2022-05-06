import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";


function Entrada() {
    const { token } = useContext(UserContext);
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function salvarEntrada(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5000/registros", {valor, descricao, tipo: "Entrada"}, config);
        }catch(e) {
            console.log("não foi possível registrar a entrada", e);
        }
    }
    return (
        <>
        <p>Nova Entrada</p>
        <form onSubmit={salvarEntrada}>
            <input type="text" placeholder="Valor" required onChange={(e) => setValor(e.target.value)}></input>
            <input type="text" placeholder="Descrição" required onChange={(e) => setDescricao(e.target.value)}></input>
            <Link to="/home"><button type="submit">Salvar Entrada</button></Link>
        </form>
        </>
    );
}

export default Entrada;