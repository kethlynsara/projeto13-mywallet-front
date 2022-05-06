import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// import styled from "styled-components";


function SignUp() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha1, setSenha1] = useState("");
    const [senha2, setSenha2] = useState("");

     async function cadastrar(event) {
        event.preventDefault();

        try {
            await axios.post("http://localhost:5000/sign-up", {
                nome,
                email,
                senha1,
                senha2
            });
        }catch(e) {
            console.log(e.response);
            alert(e.response.data);
        }
    }

    return (
        <>
            <h2>MyWallet</h2>
            <form onSubmit={cadastrar}>
                <input type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)}></input>
                <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Senha" required value={senha1} onChange={(e) => setSenha1(e.target.value)}></input>
                <input type="password" placeholder="Confirme a senha" required value={senha2} onChange={(e) => setSenha2(e.target.value)}></input>
                <Link to="/"><button type="submit">Cadastrar</button></Link>
                <Link to="/">Já tem uma conta? Entre agora!</Link>
            </form>
        </>
    )
}

export default SignUp;