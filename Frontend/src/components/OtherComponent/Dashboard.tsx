"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import UserModal from "./UserModal";
import { useAuth } from "@/Providers/AuthProvide";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  Clock,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  wallet: { balance: number };
}

interface HistoryEntry {
  _id: string;
  userID: string;
  amount: number;
  profit: number;
  loss: number;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { isLoading, logout } = useAuth();

  // ✅ Fetch users & history
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

    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/getHistory", {
          withCredentials: true,
        });
        setHistory(res.data.history || []);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchUsers();
    fetchHistory();
  }, [refresh]);

  // ✅ Date formatter
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">Manage and view registered users</p>
        </div>
        <Button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          LogOut
        </Button>
      </header>

      {/* Stats */}
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

      {/* Main Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
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
                        setOpen(true);
                        setSelectedUser(user);
                      }}
                    >
                      <CardContent className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <p className="font-medium">₹{user.wallet.balance}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </section>
        </TabsContent>

        {/* ✅ History Tab with Amount / Profit / Loss Sub-tabs */}
        <TabsContent value="history">
          <section className="border rounded-lg p-4 bg-white">
            <h2 className="text-lg font-semibold mb-3">Transaction History</h2>

            {historyLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-muted-foreground">No transaction history yet.</p>
              </div>
            ) : (
              <Tabs defaultValue="amount" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="amount">Amount</TabsTrigger>
                  <TabsTrigger value="profit">Profit</TabsTrigger>
                  <TabsTrigger value="loss">Loss</TabsTrigger>
                </TabsList>

                {["amount", "profit", "loss"].map((category) => {
                  const merged = history.map((entry) => {
                    const user = users.find((u) => u._id === entry.userID);
                    return {
                      ...entry,
                      userName: user?.name || "Unknown User",
                      userEmail: user?.email || "No Email",
                    };
                  });

                  // Filter by category numeric > 0
                  const filtered = merged.filter((entry) => entry[category as keyof HistoryEntry] > 0);

                  return (
                    <TabsContent key={category} value={category}>
                      {filtered.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No {category} transactions yet.
                        </div>
                      ) : (
                        <ScrollArea className="h-[600px]">
                          <div className="space-y-3">
                            {filtered.map((entry) => (
                              <Card key={entry._id} className="border hover:shadow-sm transition">
                                <CardContent className="py-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="font-semibold">{entry.userName}</p>
                                        <Badge variant="outline" className="capitalize">
                                          {category}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-1">
                                        {entry.userEmail}
                                      </p>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(entry.createdAt)}
                                      </div>
                                    </div>
                                    <div className="text-right ml-4">
                                      <p
                                        className={`text-lg font-bold ${
                                          category === "profit"
                                            ? "text-green-600"
                                            : category === "loss"
                                            ? "text-red-600"
                                            : "text-blue-600"
                                        }`}
                                      >
                                        ₹{entry[category as keyof HistoryEntry]}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </section>
        </TabsContent>
      </Tabs>

      {open && selectedUser && (
        <UserModal
          open={open}
          onOpenChange={setOpen}
          user={selectedUser}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Dashboard;
