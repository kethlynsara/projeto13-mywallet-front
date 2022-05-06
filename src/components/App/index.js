import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { useState } from "react";

import Login from "../Login";
import SignUp from "../SignUp";
import Home from "../Home";
import Entrada from "../Entrada"
import Saida from "../Saida"

import "../../assets/css/style.css"
import "../../assets/css/reset.css"

function App() {
    const [token, setToken] = useState("");
    console.log("come onnnn")
    return (
        <UserContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp/>} />
                    <Route path="/entrada" element={<Entrada />} />
                    <Route path="/saida" element={<Saida />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;
