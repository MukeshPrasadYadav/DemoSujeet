import { useAuth } from "@/Providers/AuthProvide";
import { Navigate } from 'react-router-dom';
import  {  type ReactNode } from 'react';
import { Spinner } from "@/components/ui/spinner";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { user,isLoading } = useAuth();
  console.log("user in protected route",isLoading,user)
  


  if(isLoading) return <Spinner className="h-8 w-8" />


  if (!user && !isLoading) return <Navigate to ='/login'  replace/>

  return <> {children}</>
};

export default ProtectedRoutes