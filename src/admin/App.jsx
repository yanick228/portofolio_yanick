import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Experiences from './pages/Experiences';
import Educations from './pages/Educations';
import About from './pages/About';

const AdminApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path=""
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="projects"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Projects />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="experiences"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Experiences />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="educations"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Educations />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <About />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminApp;

