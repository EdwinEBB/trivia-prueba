import React, { useState,useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Home(){
    const {login}= useContext(AuthContext)!;
    const [nombreusuario, setNombreusuario]=useState("");
    const [contraseña, setContraseña]=useState("");


    const handleLogin=async (e:React.FormEvent)=>{
        e.preventDefault();
        const success= await login(nombreusuario,contraseña);

        if(success){
            window.location.href = "/gameQ";
        }else{
            
        }
    };

    return(
        <div>
            <h1>Bienvenido a TriGame</h1>
            <h3>Tu trivia interactiva favortia</h3>
            <input type="text" placeholder="Ingrese su usuario" onChange={(e)=> setNombreusuario(e.target.value)}/>
            <input type="password" placeholder="Ingrese su contraseña" onChange={(e)=> setContraseña(e.target.value)}/>
            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
    )
}