import React from "react";
import {  MoveRight } from "lucide-react";

interface CardProps {
  icon: React.ReactNode;
  text: string;
}

 export const Card: React.FC<CardProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-between gap-3 bg-[#F7F1EB] h-25 p-4 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="text-blue-500">{icon}</div>
        <p className="font-medium text-gray-800 wrap-break-word">{text}</p>
      </div>
      <MoveRight className="text-blue-500" />
    </div>
  );
};

