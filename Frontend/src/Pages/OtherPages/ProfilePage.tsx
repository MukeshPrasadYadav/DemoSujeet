import React, { useEffect, useState } from "react";
import {
  Camera,
  TrendingUp,
  Bell,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/Providers/AuthProvide";
import { useNavigate } from "react-router-dom";
import PaymentProofUploader from "@/components/OtherComponent/PaymentProofUploader";
import WithdrawRequestModal from "@/components/OtherComponent/WithdrawModel";

export interface INotification {
  id: number;
  text: string;
  unread: boolean;
  time: string;
}

export default function TradingProfile() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <>Loading...</>;

  const [name, setName] = useState(user?.name || "John Trader");
  const [isEditingName, setIsEditingName] = useState(false);
  const [opean, setOpean] = useState<"AddAmount" | "withDrawAmount" | null>(
    null
  );
  const [photo, setPhoto] = useState(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&auto=format&q=80"
  );
  const [balance, setBalance] = useState(user?.balance || 45750.8);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  // Load existing notifications
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notifications") || "[]");
    setNotifications(saved);
  }, []);

  // Handle new notifications
  const addNotification = (message: string) => {
    const newNotif: INotification = {
      id: Date.now(),
      text: message,
      unread: true,
      time: new Date().toLocaleString(),
    };

    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const chartData = [
    { time: "Jan", value: 30000 },
    { time: "Feb", value: 32500 },
    { time: "Mar", value: 31200 },
    { time: "Apr", value: 35800 },
    { time: "May", value: 38900 },
    { time: "Jun", value: 42300 },
    { time: "Jul", value: 45750 },
    { time: "Aug", value: 50000 },
    { time: "Sep", value: 50000 },
    { time: "Oct", value: 50000 },
    { time: "Nov", value: 50000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <img
                src={photo}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500/30 grayscale"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditingName ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  className="text-3xl font-bold bg-slate-700 px-3 py-1 rounded border-2 border-emerald-500"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-3xl font-bold cursor-pointer hover:text-emerald-400 transition-colors"
                  onClick={() => setIsEditingName(true)}
                >
                  {name}
                </h1>
              )}
              <p className="text-slate-400 mt-1">
                Active Trader • Member since {user.activeUserSince}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <button
                  onClick={() => setOpean("AddAmount")}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Add Amount
                </button>
                <button
                  onClick={() => navigate("/invest")}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Invest
                </button>
                <button
                  onClick={() => setOpean("withDrawAmount")}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  Withdraw
                </button>
              </div>
            </div>

            {/* Balance Box */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 min-w-[200px]">
              <p className="text-emerald-100 text-sm">Total Balance</p>
              <p className="text-3xl font-bold mt-1">
                ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-emerald-200 text-sm mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                +15.3% this month
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Portfolio Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction & Notification Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Transactions */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <p className="text-slate-400">No transactions yet</p>
          </div>

          {/* Notifications */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Notifications
              </h2>
              {notifications.length > 0 && (
                <button
                  onClick={() => {
                    const cleared = notifications.map((n) => ({
                      ...n,
                      unread: false,
                    }));
                    setNotifications(cleared);
                    localStorage.setItem(
                      "notifications",
                      JSON.stringify(cleared)
                    );
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-slate-400 text-sm">No notifications yet</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`bg-slate-700/30 rounded-lg p-4 transition-colors ${
                      notif.unread ? "border-l-4 border-blue-500" : ""
                    }`}
                  >
                    <p className="text-sm">{notif.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                  </div>
                ))
              )}
            </div>
           
          </div>
        </div>
      </div>
       {opean === "AddAmount" && (
              <PaymentProofUploader
                isOpen={true}
                onClose={() => setOpean(null)}
                onNotify={addNotification}
              />
            )}
            {opean === "withDrawAmount" && (
              <WithdrawRequestModal
                isOpen={true}
                onClose={() => setOpean(null)}
                onNotify={addNotification}
              />
            )}
    </div>
  );
}
