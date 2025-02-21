import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
      <AuthProvider>
        <html lang="es">
          <body>{children}</body>
        </html>
      </AuthProvider>
    );
  }