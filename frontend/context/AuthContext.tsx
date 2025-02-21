import {createContext, useState, useEffect, ReactNode, useContext} from "react"
import Api from '../services/api'
import { Snackbar,Alert } from "@mui/material";


interface AuthContextType {
    user:any|null;
    login:(nombreusuario:string,contraseña:string) => Promise<boolean>;
    logout: ()=> void;
}

export const AuthContext= createContext<AuthContextType | null>(null)


export const AuthProvider= ({children}: {children:ReactNode})=>{
    const [user,setUser]= useState(null);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<"error" | "success">("error");

    useEffect(()=>{
        const checkAuth= async () =>{
            try {
                const response= await Api.get("/auth/profile")
                setUser(response.data.user);
            } catch (error) {
                setUser(null)
            }
        };
        checkAuth();
    },[]);

    const showAlert = (message: string, severity: "error" | "success") => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpen(true);
    };

    const login= async (nombreusuario:string,contraseña:string): Promise<boolean> =>{
        console.log("Datos enviados al backend:",{nombreusuario,contraseña})
        try {
            const logeo=await Api.post("/auth/login",{nombreusuario,contraseña:contraseña});
            if(logeo.status===200){
                const response= await Api.get("auth/profile")
                setUser(response.data);
                setAlertSeverity("success");
                setAlertMessage("Inicio de sesión exitoso");
                setOpen(true);

                //sessionStorage.setItemItem("alertMessage", "Inicio de sesión exitoso");
                //sessionStorage.setItemItem("alertSeverity", "success");
                return true;
            }
            
        } catch (error:any) {
            if (error.response && error.response.status === 401) {
                showAlert(error.response.data.message, "error");
                return false;
            } else {
                showAlert("Ocurrió un error inesperado", "error");
                console.log(error)
            }
        }

        return false;
    }

    const logout=()=>setUser(null)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
            <Snackbar 
                open={open} 
                autoHideDuration={3000} 
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity={alertSeverity} onClose={() => setOpen(false)}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    )
}

export const useAuth= ()=>{
    const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
