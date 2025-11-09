import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";



interface Iuser{
  name:string,
  email:string,
  balance:number,
  role:string,
  activeUserSince:string,

}

interface AuthContextType {
  setUser:React.Dispatch<React.SetStateAction<{
    name:string,
    email:string
    role:string
    balance:number,
    activeUserSince:string,
  }>>;
  setRole:React.Dispatch<React.SetStateAction<string>>;
  role:string,
  user:Iuser,
  isAuthenticated: boolean;
  userId:string;
  isLoading: boolean;
  logout: () => Promise<void>;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {


  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId,setUserID]=useState('')
  const [isLoading, setIsLoading] = useState(true); // start as loading=true

  const [user,setUser]=useState<Iuser>({
    name:"",
    email:'',
    role:'',
    balance:0,
    activeUserSince:''
  })
  const [role,setRole]=useState('')
  useEffect(() => {
    console.log("Checking authentication status..."); 
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          withCredentials: true,
        });
        console.log(res)

        if (res.data.success) {
          console.log("data ",res)
          setRole(res.data.user.role)
          setUserID(res.data.user.userId)
          setIsAuthenticated(true);
          setIsLoading(false);

        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setIsLoading(false);
      } 
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const res=await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser({
        name:"",
        email:'',
        role:'',
        balance:0,
        activeUserSince: ''
      })
      
      setIsAuthenticated(false)
      console.log("Logged out successfully",res);
      
    } catch (err) {
      console.error("Logout failed", err);
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{user,userId,role,setRole, isAuthenticated,setUser,isLoading ,logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)!;
