
import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Login from "./Pages/AuthPages/Login";
import SignUp from "./Pages/AuthPages/SignUp";
import Dashboard from "./components/OtherComponent/Dashboard";
import ProtectedSignIn from "./Helpers/ProtectedSignUp";
import ProtectedRoutes from "./Helpers/ProtectedRoutes";
import { Toaster } from "sonner";
import { AuthProvider } from "./Providers/AuthProvide";
import Home from "./Pages/OtherPages/Home";


function App() {


  return (
    <AuthProvider>
   
    <Router>
      <Routes>

        <Route path="/login" element={
          <ProtectedSignIn>
          <Login />
          </ProtectedSignIn>
          } />

          <Route path="/signup" element={
          <ProtectedSignIn>
          <SignUp />
         </ProtectedSignIn>
          } />

        <Route path="/" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />

      </Routes>
        
    </Router>
    <Toaster position="top-right" />
    </AuthProvider>
  )
}

export default App
