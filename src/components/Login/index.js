import styled from "styled-components";

function Login() {
  return (
      <Contanier>
          <H2>MyWallet</H2>
          <form>
              <input type="email" placeholder="E-mail"></input>
              <input type="password" placeholder="Senha"></input>
              <button type="button">Entrar</button>
              <a href="https://www.google.com/">Primeira vez? Cadastre-se!</a>
          </form>
      </Contanier>
  )
    
}

const H2 = styled.h2`
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
`;

const Contanier = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 159px 25px 192px 25px;

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
    }
`;
export default Login;
