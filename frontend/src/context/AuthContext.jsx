import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const DEMO_USERS = [
  {
    correo: "carlos.mendoza@innovatech.com",
    nombre: "Carlos Mendoza Ramos",
    rol: "Administrador de Sistemas",
    area: "Tecnología",
    iniciales: "CM",
  },
  {
    correo: "soporte@innovatech.com",
    nombre: "Jorge Silva Vega",
    rol: "Responsable de Tecnología (Soporte TI)",
    area: "Soporte y Operaciones",
    iniciales: "JS",
  },
  {
    correo: "ana.perez@innovatech.com",
    nombre: "Ana María Pérez",
    rol: "Colaborador",
    area: "Desarrollo de Software",
    iniciales: "AP",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("techasset_session");
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default logged-in admin for ease of testing
    } catch {
      return DEMO_USERS[0];
    }
  });

  const login = (correo, password) => {
    // Check if matching demo user
    const matched = DEMO_USERS.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
    );

    const activeUser = matched || {
      correo: correo.trim().toLowerCase(),
      nombre: correo.split("@")[0].replace(".", " ").toUpperCase(),
      rol: "Colaborador",
      area: "Operaciones",
      iniciales: correo.substring(0, 2).toUpperCase(),
    };

    setUser(activeUser);
    localStorage.setItem("techasset_session", JSON.stringify(activeUser));
    return activeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("techasset_session");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, demoUsers: DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
}
