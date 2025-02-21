"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Api from "@/services/api";

export default function Rankgin() {
    const [rankgin,setRankgin]=useState<{user:string,puntaje:number}[]>([])

    useEffect(()=>{
        async function fetchRanking(){
            try {
                const response= await Api.get("/ranking")
                setRankgin(response.data)
            } catch (error) {
                console.error("Error obtenido en el ranking:",error)
            }
        }
        fetchRanking();

        const socket= io(process.env.NEXT_PUBLIC_URL_BACKEND as string);
        socket.on("updaterankign", (updateranking)=>{
            setRankgin(updateranking);
        });

        return()=>{
            socket.disconnect();

        }
    },[]);

    return(
        <div>
            <h2>RANKING</h2>
            <table>
                <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Puntaje</th>
                    </tr>
                </thead>
                <tbody>
                    {rankgin.map((r,index)=>(
                        <tr key={index}>
                            <td> {r.user} </td>
                            <td> {r.puntaje} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}