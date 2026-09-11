import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, ROLE_DEFAULT_ROUTES } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import ControlTower from './pages/ControlTower';
import SiteManager from './pages/SiteManager';
import SubmitProgress from './pages/SubmitProgress';
import Portfolio from './pages/Portfolio';
import AIAssistant from './pages/AIAssistant';
import Projects from './pages/Projects';
import Activities from './pages/Activities';
import ProgressUpdates from './pages/ProgressUpdates';
import UserManagement from './pages/UserManagement';

function RootRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (isAuthenticated && role) {
    const destination = ROLE_DEFAULT_ROUTES[role] || '/control-tower';
    return <Navigate to={destination} replace />;
  }
  return <Navigate to="/login" replace />;
}

function LoginRoute() {
  const { isAuthenticated, role } = useAuth();
  if (isAuthenticated && role) {
    const destination = ROLE_DEFAULT_ROUTES[role] || '/control-tower';
    return <Navigate to={destination} replace />;
  }
  return <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginRoute />} />

          {/* Root Redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Protected Application Workspace */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Project Control Tower: Primary for Project Controller */}
            <Route
              path="/control-tower"
              element={
                <ProtectedRoute allowedRoles={['controller', 'authority', 'field_user']}>
                  <ControlTower />
                </ProtectedRoute>
              }
            />

            {/* Site Manager: Primary for Field User / Site Manager */}
            <Route
              path="/site-manager"
              element={
                <ProtectedRoute allowedRoles={['field_user', 'controller', 'authority']}>
                  <SiteManager />
                </ProtectedRoute>
              }
            />

            {/* Submit Progress Update */}
            <Route
              path="/submit-progress"
              element={
                <ProtectedRoute allowedRoles={['field_user', 'controller', 'authority']}>
                  <SubmitProgress />
                </ProtectedRoute>
              }
            />

            {/* Authority / Portfolio Overview: Primary for Authority */}
            <Route
              path="/portfolio"
              element={
                <ProtectedRoute allowedRoles={['authority', 'controller']}>
                  <Portfolio />
                </ProtectedRoute>
              }
            />

            {/* Projects Overview */}
            <Route
              path="/projects"
              element={
                <ProtectedRoute allowedRoles={['field_user', 'controller', 'authority']}>
                  <Projects />
                </ProtectedRoute>
              }
            />

            {/* Project Activities */}
            <Route
              path="/activities"
              element={
                <ProtectedRoute allowedRoles={['field_user', 'controller', 'authority']}>
                  <Activities />
                </ProtectedRoute>
              }
            />

            {/* Progress Updates Log */}
            <Route
              path="/progress-updates"
              element={
                <ProtectedRoute allowedRoles={['field_user', 'controller', 'authority']}>
                  <ProgressUpdates />
                </ProtectedRoute>
              }
            />

            {/* Ask Project AI */}
            <Route
              path="/ai-assistant"
              element={
                <ProtectedRoute allowedRoles={['field_user', 'controller', 'authority']}>
                  <AIAssistant />
                </ProtectedRoute>
              }
            />

            {/* User Management */}
            <Route
              path="/user-management"
              element={
                <ProtectedRoute allowedRoles={['authority']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback wildcard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}