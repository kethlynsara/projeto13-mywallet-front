import axios from "axios";

import styled from "styled-components";

function Home() {
    return (
        <>
            <div>
                <p>Olá, Fulano</p>
                <button>deslogar</button>
            </div>
            <div>Registros</div>
            <Buttons className="buttons">
                <Div><button>+</button></Div>
                <Div><button>-</button></Div>
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

