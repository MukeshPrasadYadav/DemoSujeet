
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
import LandingPage from "./Pages/LandingPage";
import Profile from "./Pages/OtherPages/ProfilePage";
import PageWithGraph from "./Pages/OtherPages/PageWithGraph";


function App() {


  return (
    <AuthProvider>
   
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={
         // <ProtectedSignIn>
          <Login />
         // </ProtectedSignIn>
          } />

          <Route path="/signup" element={
        //  <ProtectedSignIn>
          <SignUp />
       //  </ProtectedSignIn>
          } />
          <Route path="/profile" element={
            <ProtectedRoutes>
            <Profile />
            </ProtectedRoutes>
            } />

            <Route path="/Invest" element={
              <PageWithGraph />
            } />

        <Route path="/home" element={
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
