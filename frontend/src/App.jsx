import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import EquiposList from "./pages/EquiposList";
import CreateEquipo from "./pages/CreateEquipo";
import PrestamosList from "./pages/PrestamosList";
import CreatePrestamo from "./pages/CreatePrestamo";
import UsuariosList from "./pages/UsuariosList";
import CreateUsuario from "./pages/CreateUsuario";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipos" element={<EquiposList />} />
          <Route path="/equipos/nuevo" element={<CreateEquipo />} />
          <Route path="/prestamos" element={<PrestamosList />} />
          <Route path="/prestamos/nuevo" element={<CreatePrestamo />} />
          <Route path="/usuarios" element={<UsuariosList />} />
          <Route path="/usuarios/nuevo" element={<CreateUsuario />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
