"use client";


import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Providers/AuthProvide";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../ui/spinner";



const UserDashboard = () => {

  const { logout, isLoading,userId } = useAuth();


  const[user,setUser]=useState();

  useEffect(()=>{
    console.log(userId)
    const fetchUSer=async()=>{
        const res = await axios.get(`http://localhost:5000/api/users/getUser?userId=${userId}`, {
  withCredentials: true
});
setUser(res.data.user)
    console.log("resposne",res)
    }
    fetchUSer();
    
  },[])

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-32" />
      </div>
    );
  }



  if (!user && !isLoading ) {
    return (
        <div className="h-screen flex items-center justify-center">
            <Spinner className="text-black w-8 h-8" />
        </div>
     
    );
  }

  return (
    <div className="p-6 space-y-6  mx-auto">
      {/* ✅ Header */}
      <header className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <Button
        className="cursor-pointer"
          onClick={() => {
            logout();
            toast.info("Logged out successfully!");
          }}
        >
          Logout
        </Button>
      </header>

      {/* ✅ Profile Info */}
      <Card className="shadow-sm border">
        <CardContent className="space-y-3 py-5">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Wallet Balance</p>
            <p className="text-xl font-bold text-green-600">
              ₹{user.wallet.balance}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Optional: Add More Features Later */}
      <div className="text-center text-lg text-gray-500">
        More features coming soon 🚀
      </div>
    </div>
  );
};

export default UserDashboard;
