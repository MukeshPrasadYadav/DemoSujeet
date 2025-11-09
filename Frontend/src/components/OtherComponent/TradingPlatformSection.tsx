import React from "react";

const TradingPlatformSection = () => {
  return (
    <section className="bg-[#e9eefc]">
      <div className="max-w-7xl mx-auto px-6 flex flex-row">
        {/* LEFT SIDE */}
        <div className="space-y-6 py-20">
          <p className="text-sm uppercase tracking-wide text-gray-600 font-medium">
            Trading platforms
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Optimise your strategy <br /> with the right platform and tools
          </h2>

          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
            Explore our platforms
          </button>

          {/* Google Play Section */}
          <div className="flex items-center gap-2 pt-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-36"
            />
            <div className="text-sm text-gray-700">
              <span className="font-medium">4.2 ★</span>
              <span className="text-gray-500 ml-1">on Google Play</span>
            </div>
          </div>
        </div>
         <div className="relative w-full right-0">
          
         <img 
         src="https://www.home.saxo/-/media/images/frontpage/redesign-2024/glo-platforms-d.png?la=en&amp;mw=1280&amp;w=975&amp;hash=9342FE4F12A7BCB8DA6BE6CDCF27B352"
         alt="Main Trading Screen"
         />
        </div>
        
      </div>
     
    </section>
  );
};

export default TradingPlatformSection;
