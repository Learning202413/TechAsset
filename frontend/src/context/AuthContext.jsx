import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: "Administrador de Sistemas",
  SOPORTE: "Responsable de Tecnología",
  COLABORADOR: "Colaborador",
};

export const DEMO_USERS = [
  {
    correo: "carlos.mendoza@innovatech.com",
    nombre: "Carlos Mendoza Ramos",
    rol: ROLES.ADMIN,
    area: "Tecnología & Infraestructura",
    iniciales: "CM",
  },
  {
    correo: "soporte@innovatech.com",
    nombre: "Sofía Valenzuela",
    rol: ROLES.SOPORTE,
    area: "Soporte y Operaciones",
    iniciales: "SV",
  },
  {
    correo: "ana.perez@innovatech.com",
    nombre: "Ana María Pérez",
    rol: ROLES.COLABORADOR,
    area: "Desarrollo de Software",
    iniciales: "AP",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("techasset_session");
      return saved ? JSON.parse(saved) : DEMO_USERS[0];
    } catch {
      return DEMO_USERS[0];
    }
  });

  const login = (correo) => {
    const matched = DEMO_USERS.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
    );

    const activeUser = matched || {
      correo: correo.trim().toLowerCase(),
      nombre: correo.split("@")[0].replace(".", " ").toUpperCase(),
      rol: ROLES.COLABORADOR,
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

  // RBAC Permission Computations
  const rolNormalized = (user?.rol || "").toLowerCase();
  const isAdmin = rolNormalized.includes("admin");
  const isTech = rolNormalized.includes("tecnolog") || rolNormalized.includes("soporte");
  const isColaborador = !isAdmin && !isTech;

  const canManageUsers = isAdmin; // Solo Administrador
  const canManageEquipos = isAdmin || isTech; // Admin y Soporte pueden registrar y cambiar estado
  const canDeleteEquipos = isAdmin; // Solo Administrador puede eliminar activos
  const canManagePrestamos = isAdmin || isTech; // Admin y Soporte pueden registrar préstamos y devoluciones

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        demoUsers: DEMO_USERS,
        isAdmin,
        isTech,
        isColaborador,
        canManageUsers,
        canManageEquipos,
        canDeleteEquipos,
        canManagePrestamos,
      }}
    >
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
