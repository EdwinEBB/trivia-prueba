"use client";

import { useState, useEffect } from "react";
import Api from "@/services/api";
import Temporizador from "@/components/temporizador";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import withAuth from "@/utils/withAuth";

interface Pregunta {
    id:number;
    text:string;
    options:string[];
    correct:string;
}

function JuegoPreguntas() {

    const [categoria,serCategoria]=useState("react")
    const [preguntas,setPreguntas]=useState<Pregunta[]>([]);
    const [preguntaactual,setpreguntaactual]= useState(0);
    const [selectrespuesta,setSelectRespuesta]= useState<string | null>(null)
    const [puntaje,setPuntaje]=useState(0);
    const [socket,setSocket]=useState<any>(null);

    const router= useRouter();

    useEffect(()=>{
        const newSocket= io(process.env.NEXT_PUBLIC_URL_BACKEND as string)
        setSocket(newSocket);

        return ()=>{
            newSocket.disconnect();
        };
    },[])


    useEffect(()=>{
        const fetchpreguntas= async ()=>{
            const response= await Api.get(`/question?categoria=${categoria}`)
            setPreguntas(response.data);
        };

        fetchpreguntas();
    },[categoria]);

    const handleTimeout= ()=>{
        setpreguntaactual((prev)=> prev + 1);
        setSelectRespuesta(null)
    }


    const responderPregunta= (respuesta:string)=>{
        if(selectrespuesta) return;

        setSelectRespuesta(respuesta);
        const esCorrecta= respuesta === preguntas[preguntaactual]?.correct;

        if(esCorrecta){
            const newPuntaje= puntaje + 10;
            setPuntaje(newPuntaje);
            if(socket){
                socket.emit("updateRaking",{user:"Usuario",puntaje:newPuntaje});
            }
        }

        setTimeout(()=>{
            setpreguntaactual((prev)=>prev+1);
            setSelectRespuesta(null);
        },2000);
    }

    


    if(!preguntas.length) return <p>Cargando Preguntas...</p>;

    if(preguntaactual >= preguntas.length){
        return(
            <div>
                <h2>Juego Terminado:</h2>
                <p>Puntaje Final: {puntaje} </p>
                <button onClick={()=> router.push("/rankgin")}>Ver Rankgin</button>
            </div>
        )
    }

    return(
        <div>
            <h2>Categoría: {categoria} </h2>
            <h3> {preguntas[preguntaactual].text} </h3>
            <Temporizador onTimeout={handleTimeout}/>
            {preguntas[preguntaactual].options.map((op:string, index:number)=>(
                <button
                key={index}
                onClick={()=> responderPregunta(op)}
                disabled={!!selectrespuesta}
                style={{
                    backgroundColor:
                    selectrespuesta === op
                    ? op === preguntas[preguntaactual].correct
                    ?"green"
                    : "red"
                    : "white"
                }}
                >
                    {op}
                </button>
            ))}
            <p>Puntaje: {puntaje} </p>
        </div>
    )

}

export default withAuth(JuegoPreguntas)