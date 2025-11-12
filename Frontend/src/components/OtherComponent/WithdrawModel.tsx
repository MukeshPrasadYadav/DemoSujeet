import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";

interface WithdrawRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (message: string) => void; // 👈 callback
}

const WithdrawRequestModal: React.FC<WithdrawRequestModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("Request Withdraw Amount");

  useEffect(() => {
    const savedAmount = localStorage.getItem("withdrawAmount");
    const savedDesc = localStorage.getItem("withdrawDescription");
    if (savedAmount) setAmount(savedAmount);
    if (savedDesc) setDescription(savedDesc);
  }, []);

  const handleSave = () => {
    if (!amount) {
      toast.error("Please enter amount");
      return;
    }

    localStorage.setItem("withdrawAmount", amount);
    localStorage.setItem("withdrawDescription", description);

    const newNotif = {
      id: Date.now(),
      text: `🏦 Withdraw request of ₹${amount} submitted. It will be processed in 3 working days.`,
      unread: true,
      time: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("notifications") || "[]");
    const updated = [newNotif, ...existing];
    localStorage.setItem("notifications", JSON.stringify(updated));

    onNotify(newNotif.text);
    toast.success("Withdraw request submitted!");
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[420px] bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white rounded-2xl shadow-2xl p-6 border border-slate-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-sky-400">
          🏦 Request Withdraw Amount
        </h2>

        <div className="mb-4">
          <label htmlFor="amount" className="block mb-1 text-sm text-gray-300">
            Enter Amount
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white placeholder-gray-400 focus-visible:ring-1 focus-visible:ring-sky-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-300">
            Description
          </label>
          <Textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white placeholder-gray-400 focus-visible:ring-1 focus-visible:ring-sky-500"
          />
        </div>

        <p className="text-sm text-gray-400 mb-5 text-center">
          ⚠️ It takes <span className="text-sky-400">3 working days</span> for
          withdrawal to complete.
        </p>

        <Button
          onClick={handleSave}
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold"
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export default WithdrawRequestModal;
