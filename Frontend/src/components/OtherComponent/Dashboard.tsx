"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import UserModal from "./UserModal";
import { useAuth } from "@/Providers/AuthProvide";
import { Button } from "../ui/button";

interface User {
  _id: string;
  name: string;
  email: string;
  wallet: {
    balance: number;
  };
}

const Dashboard = () => {
  const [opean, setOpean] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const {isLoading,logout,role}=useAuth();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all", {
          withCredentials: true,
        });
        setUsers(res.data.users || []);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    console.log("role",role)
  }, [refresh]);

  return (
    <div className="p-6 space-y-6">

      {/* ✅ Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and view registered users
          </p>
        </div>

        {/* Example Logo or text */}
        <Button onClick={()=>logout()}>LogOut</Button>
        {/* <div className="text-xl font-semibold">Demo Admin</div> */}   
      </header>

      {/* ✅ Optional Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-xl font-bold">{users.length}</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-sm text-muted-foreground">Active Plans</p>
          <p className="text-xl font-bold">---</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-sm text-muted-foreground">Total Wallet Value</p>
          <p className="text-xl font-bold">
            ₹{users.reduce((acc, u) => acc + u.wallet.balance, 0)}
          </p>
        </div>
      </section>

      {/* ✅ Scrollable Users List */}
      <section className="border rounded-lg p-4 bg-white">
        
        <h2 className="text-lg font-semibold mb-3">Users</h2>

        {loading || isLoading ? (
          
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {users.map((user) => (
                <Card
                  key={user._id}
                  className="border cursor-pointer hover:shadow-md transition"
                  onClick={() => {
                    setOpean(true);
                    setSelectedUser(user);
                  }}
                >
                  <CardContent className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">₹{user.wallet.balance}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </section>

            {console.log('loading,islOading',loading,isLoading)}

      {opean && selectedUser && (
        <UserModal
          open={opean}
          onOpenChange={setOpean}
          user={selectedUser}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Dashboard;


