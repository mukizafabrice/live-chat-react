import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Notification from "./components/Notification"; // Import Notification Component

function App() {
  const isAuthenticated = () => {
    // Check for user authentication (e.g., a token in localStorage)
    return localStorage.getItem("token") !== null;
  };

  // Wrapper for protected routes
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />; // Redirect to Login if not authenticated
    }
    return children;
  };

  // A wrapper to conditionally render the Navbar
  const Layout = ({ children }) => {
    const location = useLocation();
    const showNavbar = location.pathname !== "/"; // Show Navbar for all pages except Login
    return (
      <>
        {showNavbar && <Navbar />}
        <Notification /> {/* Add Notification component here */}
        {children}
      </>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          {/* Redirect any unknown route to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
