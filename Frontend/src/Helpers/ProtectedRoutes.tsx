import { useAuth } from "@/Providers/AuthProvide";
import { Navigate } from 'react-router-dom';
import  { useEffect, type ReactNode } from 'react';
import { Spinner } from "@/components/ui/spinner";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated,isLoading } = useAuth();
  console.log("user in protected route",isAuthenticated,isLoading)
  

  // useEffect(()=>{

  // },[isUser])
  // if(isLoading) return <div>loading...</div>
  if(isLoading) return <Spinner className="h-8 w-8" />


  if (!isAuthenticated && !isLoading) return <Navigate to ='/login'  replace/>

  return <> {children}</>
};

export default ProtectedRoutes