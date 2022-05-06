import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";

import styled from "styled-components";

function Home() {
    const { token, setToken } = useContext(UserContext);

    const [registros, setRegistros] = useState(null);
    console.log(token);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function getRegistros() {
        try {
            const response = await axios.get("http://localhost:5000/registros", config);
            console.log("api response", response.data);
            setRegistros(response.data);
        }catch(e) {
            console.log("não deu bom no get registros", e.response);
        }
    }

    useEffect(() => getRegistros, []);

    getRegistros();
    return (
        <>
            <div>
                <p>Olá, Fulano</p>
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
export default Home;

