import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const withAuth=(WrappedComponent:any)=> {
    return (props:any)=>{
        const {user}=useAuth();
        const router=useRouter();


        useEffect(() => {
            if (!user) {
              router.push("/");
            }
          }, [user]);
      
          if (!user) return null;

          return <WrappedComponent {...props} />;

    }
}

export default withAuth