import UserContext from "../../contexts/UserContext";
import { useState } from "react";

import Login from "../Login";
//import SignUp from "../SignUp";
//import Home from "../Home";
import Entrada from "../Entrada"
import Saida from "../Saida"

import "../../assets/css/style.css"
import "../../assets/css/reset.css"

function App() {
    const [token, setToken] = useState("");
    console.log("come onnnn")
    return (
        <UserContext.Provider value={{token, setToken}}>
            <Login/>
            <Entrada/>
            <Saida/>
        </UserContext.Provider>
    )
}

export default App;
