import { useAuth } from "@/Providers/AuthProvide";
import { Navigate } from 'react-router-dom';
import  { useEffect, type ReactNode } from 'react';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated,isLoading } = useAuth();
  console.log("user in protected route",isAuthenticated,isLoading)
  

  // useEffect(()=>{

  // },[isUser])
  // if(isLoading) return <div>loading...</div>

  if (!isAuthenticated) return <Navigate to ='/login'  replace/>

  return <> {children}</>
};

export default ProtectedRoutes