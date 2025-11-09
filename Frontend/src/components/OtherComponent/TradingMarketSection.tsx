import React from "react";
import { CheckCircle } from "lucide-react";

const MarketNewsSection = () => {
  const features = [
    "Real-time news and updates",
    "Curated investment themes",
    "FactSet and Morningstar analyst ratings",
    "Podcasts, webinars, and educational articles",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* LEFT SIDE */}
      <div className="space-y-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Stay ahead of trends <br /> and market news
        </h2>

        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-800">
              <CheckCircle className="text-blue-600 mt-[2px]" size={20} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
          Preview insights
        </button>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="flex justify-center md:justify-end">
        <img
          src="https://www.home.saxo/-/media/images/frontpage/redesign-2024/newsandinsights-2024.png?la=en&amp;h=700&amp;mw=1280&amp;w=525&amp;hash=050067D68270B2D05F2EFB1A5AAFFC09" // replace with your own image
          alt="Market News Podcast"
          className="w-full max-w-md rounded-lg shadow-md object-cover"
        />
      </div>
    </section>
  );
};

export default MarketNewsSection;
