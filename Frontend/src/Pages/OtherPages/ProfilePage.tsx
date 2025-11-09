import React, { useState } from 'react';
import { Camera, TrendingUp, Bell, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/Providers/AuthProvide';

export default function TradingProfile() {
    const {user,isLoading}=useAuth();

    if(isLoading) return <>Loading ...</>
  const [name, setName] = useState('John Trader');
  const [isEditingName, setIsEditingName] = useState(false);
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&auto=format&q=80');
  const [balance, setBalance] = useState(45750.80);

  const chartData = [
    { time: 'Jan', value: 30000 },
    { time: 'Feb', value: 32500 },
    { time: 'Mar', value: 31200 },
    { time: 'Apr', value: 35800 },
    { time: 'May', value: 38900 },
    { time: 'Jun', value: 42300 },
    { time: 'Jul', value: 45750 },
    {time:'Aug',  value: 50000},
    {time:'Sep',  value: 50000},
    {time:'Oct',  value: 50000},
    {time:'Nov',  value: 50000},
  ];

  const history = [
    { id: 1, type: 'invest', asset: 'AAPL', amount: 5000, date: '2025-11-08', profit: 12.5 },
    { id: 2, type: 'deposit', amount: 10000, date: '2025-11-05' },
    { id: 3, type: 'invest', asset: 'TSLA', amount: 3000, date: '2025-11-03', profit: -5.2 },
    { id: 4, type: 'invest', asset: 'GOOGL', amount: 7500, date: '2025-10-28', profit: 8.7 },
    { id: 5, type: 'withdraw', amount: 2000, date: '2025-10-25' }
  ];

  const notifications = [
    { id: 1, text: 'Your AAPL investment gained 12.5%', time: '2 hours ago', unread: true },
    { id: 2, text: 'Market alert: Tech stocks trending up', time: '5 hours ago', unread: true },
    { id: 3, text: 'Dividend credited: $125.50', time: '1 day ago', unread: false },
    { id: 4, text: 'Portfolio rebalancing recommended', time: '2 days ago', unread: false }
  ];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAmount = () => {
    const amount = prompt('Enter amount to add:');
    if (amount && !isNaN(amount)) {
      setBalance(prev => prev + parseFloat(amount));
    }
  };

  const handleInvest = () => {
    alert('Investment modal would open here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center gap-6">
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
                  {user.name}
                </h1>
              )}
              <p className="text-slate-400 mt-1">Active Trader • Member since {user.activeUserSince}</p>
              
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <button 
                  onClick={handleAddAmount}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Add Amount
                </button>
                <button 
                  onClick={handleInvest}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Invest
                </button>
                <button 
                  onClick={handleInvest}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  Withdraw
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 min-w-[200px]">
              <p className="text-emerald-100 text-sm">Total Balance</p>
              <p className="text-3xl font-bold mt-1">${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
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
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Transaction History */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <div className="space-y-3">
              {history.map(item => (
                <div key={item.id} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold capitalize">
                        {item.type === 'invest' ? `Invested in ${item.asset}` : 
                         item.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                      </p>
                      <p className="text-sm text-slate-400">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${item.type === 'withdraw' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {item.type === 'withdraw' ? '-' : '+'}${item.amount.toLocaleString()}
                      </p>
                      {item.profit !== undefined && (
                        <p className={`text-sm flex items-center gap-1 justify-end ${item.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.profit >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {item.profit >= 0 ? '+' : ''}{item.profit}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              Notifications
            </h2>
            <div className="space-y-3">
              {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors ${notif.unread ? 'border-l-4 border-blue-500' : ''}`}
                >
                  <p className="text-sm">{notif.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}