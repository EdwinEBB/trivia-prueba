import { useState, useEffect } from "react";

export default function Temporizador({onTimeout}: {onTimeout: ()=> void}){
    const [tiempores,setTiempoRes]= useState(10);

    useEffect(()=>{
        const temporizador= setInterval(()=>{
            setTiempoRes((prev)=> {
                if (prev===1){
                    clearInterval(temporizador)
                    onTimeout();
                    return 10;
                }
                return prev-1;
            });

        },1000);
        return ()=> clearInterval(temporizador);
    },[onTimeout]);
    return <p>Tiempo restante: {tiempores}S</p>
}