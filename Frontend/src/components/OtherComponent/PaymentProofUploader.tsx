import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";

interface UploadProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (message: string) => void; // 👈 New prop for pushing notifications
}

const PaymentProofUploader: React.FC<UploadProofModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [utr, setUtr] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const savedUtr = localStorage.getItem("utrNumber");
    const savedImage = localStorage.getItem("paymentProof");
    if (savedUtr) setUtr(null);
    if (savedImage) setImage(null);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImage(base64);
        localStorage.setItem("paymentProof", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!utr || !image) {
      toast.error("Please enter UTR and upload proof image.");
      return;
    }

    localStorage.setItem("utrNumber", utr);

    // ✅ Create a new notification
    const newNotif = {
      id: Date.now(),
      text: `💰 Payment proof uploaded successfully (UTR: ${utr})`,
      unread: true,
      time: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("notifications") || "[]");
    const updated = [newNotif, ...existing];
    localStorage.setItem("notifications", JSON.stringify(updated));

    onNotify(newNotif.text); // 👈 Notify parent (TradingProfile)
    toast.success("Payment proof uploaded successfully!");
    setUtr("");
    setImage(null);
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
          📸 Upload Proof of Payment
        </h2>

        <div className="mb-4">
          <Label htmlFor="utr" className="text-gray-300">
            Enter UTR Number
          </Label>
          <Input
            id="utr"
            placeholder="e.g. 1234567890"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="mt-2 bg-slate-800 border border-slate-600 text-white placeholder-gray-400 focus-visible:ring-1 focus-visible:ring-sky-500"
          />
        </div>

        <div className="mb-4">
          <Label className="text-gray-300">Upload Screenshot</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 bg-slate-800 border border-slate-600 text-white file:text-sky-400"
          />
          {image && (
            <img
              src={image}
              alt="Payment Proof"
              className="mt-3 rounded-md border border-slate-600 w-full max-h-60 object-contain"
            />
          )}
        </div>

        <Button
          onClick={handleSave}
          className="w-full mt-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold"
        >
          Save Proof
        </Button>
      </div>
    </div>
  );
};

export default PaymentProofUploader;
