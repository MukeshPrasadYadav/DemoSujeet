import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StartInvestingSection = () => {
  const navigate=useNavigate();
  const steps = [
    "Create your account and get verified",
    "Log in and fund your account",
    "Make your first trade",
  ];

  return (
    <section className="bg-[#f8f4ef]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 py-20 space-y-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Start investing in a few <br /> easy steps
          </h2>

          <ul className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-800">
                <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <button onClick={()=>navigate('/signUp')}
           className="bg-blue-600 text-white w-50 px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Open account
          </button>

          <div className="flex items-center gap-3 pt-2">
            <div className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              S&P
            </div>
            <p className="text-gray-800 text-sm leading-snug">
              Saxo has an investment-grade <br /> S&amp;P credit rating
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FULL HEIGHT IMAGE */}
        <div className="relative">
          <img
            src="https://www.home.saxo/-/media/images/frontpage/redesign-2024/guy-mobile-start-investing.jpg?la=en&amp;h=770&amp;mw=1280&amp;w=945&amp;hash=1F97B213F4FD5FE7EA104DE1B9EBFD5C" // replace with your image
            alt="Investor holding phone"
            className="w-full h-full object-cover md:h-[100%]"
          />
        </div>
      </div>
    </section>
  );
};

export default StartInvestingSection;
