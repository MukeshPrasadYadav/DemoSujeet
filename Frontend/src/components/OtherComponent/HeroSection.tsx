import { useEffect, useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const rightImages = [
  "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1920&q=80",
  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
];

const awards = [
  { text: "Best trading platform — BrokerChooser, 2025", stars: 4 },
  { text: "Best investment experience — Global Finance, 2024", stars: 5 },
  { text: "Trusted by professionals — FXAwards, 2023", stars: 4 },
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentAward, setCurrentAward] = useState(0);

  const navigate=useNavigate();

  // Image auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % rightImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Award rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAward((prev) => (prev + 1) % awards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#FAF7F3] py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-12">
        
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-semibold text-[#00156A] leading-tight">
            Discover a better <br /> way to invest
          </h1>

          <ul className="space-y-3 text-lg text-gray-800">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-[#0040FF] w-5 h-5" />
              Broker trusted by 1 million+ clients
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-[#0040FF] w-5 h-5" />
              Regulated financial institution with a banking licence
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-[#0040FF] w-5 h-5" />
              The Danish Guarantee Fund protects up to EUR 100,000 of your deposits
            </li>
          </ul>

          <div className="flex gap-4 pt-4">
            <Button onClick={()=>navigate('/signUp')}
             className="bg-[#0040FF] hover:bg-[#0030CC] text-white text-base px-6 py-2 rounded-md">
              Open account
            </Button>
            <Button variant="outline" className="border-[#00156A] text-[#00156A] text-base px-6 py-2 rounded-md">
              See our platform
            </Button>
          </div>

          {/* Rotating Award Section */}
          <div className="flex items-center gap-3 pt-8 transition-all duration-700">
            <div className="flex items-center gap-1">
              {[...Array(awards[currentAward].stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#0040FF] fill-[#0040FF]" />
              ))}
            </div>
            <p className="text-sm text-gray-700 font-medium">
              {awards[currentAward].text}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 relative w-full flex justify-center items-end p-4">
  <div className="relative w-full max-w-2xl aspect-[4/3]">
    {rightImages.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`slide-${index}`}
        loading="lazy"
        className={clsx(
          "absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-1000 ease-in-out",
          index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
        )}
      />
    ))}
  </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
