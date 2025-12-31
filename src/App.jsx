import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MoviesProvider } from './context/MoviesContext';
import { MyListProvider } from './context/MyListContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import MyList from './pages/MyList';

function App() {
  return (
    <AuthProvider>
      <MyListProvider>
        <MoviesProvider>
          <Router>
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected browse route */}
              <Route 
                path="/browse" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />

              {/* Protected my list route */}
              <Route 
                path="/my-list" 
                element={
                  <ProtectedRoute>
                    <MyList />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
        </MoviesProvider>
      </MyListProvider>
    </AuthProvider>
  );
}

export default App;
