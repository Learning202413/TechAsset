import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EquiposList from "./pages/EquiposList";
import CreateEquipo from "./pages/CreateEquipo";
import PrestamosList from "./pages/PrestamosList";
import CreatePrestamo from "./pages/CreatePrestamo";
import UsuariosList from "./pages/UsuariosList";
import CreateUsuario from "./pages/CreateUsuario";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Login Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-password" element={<Login initialView="forgot" />} />
          <Route path="/olvido-password" element={<Login initialView="forgot" />} />

          {/* Authenticated Application Modules wrapped in MainLayout */}
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/equipos"
            element={
              <MainLayout>
                <EquiposList />
              </MainLayout>
            }
          />
          <Route
            path="/equipos/nuevo"
            element={
              <MainLayout>
                <CreateEquipo />
              </MainLayout>
            }
          />
          <Route
            path="/prestamos"
            element={
              <MainLayout>
                <PrestamosList />
              </MainLayout>
            }
          />
          <Route
            path="/prestamos/nuevo"
            element={
              <MainLayout>
                <CreatePrestamo />
              </MainLayout>
            }
          />
          <Route
            path="/usuarios"
            element={
              <MainLayout>
                <UsuariosList />
              </MainLayout>
            }
          />
          <Route
            path="/usuarios/nuevo"
            element={
              <MainLayout>
                <CreateUsuario />
              </MainLayout>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
