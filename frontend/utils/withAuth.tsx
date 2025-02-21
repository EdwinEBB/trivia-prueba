import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push("/");
            }
        }, [user, loading]);

        if (loading) return <p>Cargando...</p>;
        if (!user) return null;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
