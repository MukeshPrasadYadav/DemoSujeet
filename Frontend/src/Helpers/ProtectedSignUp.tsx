import { useAuth } from "@/Providers/AuthProvide";
import { Navigate } from 'react-router-dom';
import  { type ReactNode } from 'react';

const ProtectedSignIn = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to ='/'  replace/>

  return <> {children}</>
};

export default ProtectedSignIn