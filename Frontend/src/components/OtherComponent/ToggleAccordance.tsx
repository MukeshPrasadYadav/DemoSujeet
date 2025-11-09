import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrustSection = () => {

  const navigate=useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const data = [
    {
      title: "Licensed Danish bank",
      content:
        "We are fully licensed and regulated in Denmark, ensuring a secure and transparent trading experience for our clients.",
    },
    {
      title: "Over 30 years of experience",
      content:
        "Established over three decades ago, our platform has consistently delivered trusted financial services worldwide.",
    },
    {
      title: "Proven stability",
      content:
        "Our strong capital base, transparent governance, and reliable track record have earned us global recognition.",
    },
    {
      title: "Human support",
      content:
        "Our dedicated support team is available to help you every step of the way, 24/5 in multiple languages.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* LEFT SIDE - IMAGE */}
      <div className="flex flex-col items-center md:items-start">
        <img
          src="https://www.home.saxo/-/media/images/frontpage/redesign-2024/kim-fournais-2024-d.jpg?la=en&amp;h=700&amp;mw=1280&amp;w=525&amp;hash=5D6092B2918A7F5C0FA10D9756B28C7E" // replace with your own CEO photo
          alt="Founder and CEO"
          className="w-full max-w-sm rounded-lg shadow-md object-cover"
        />
        <p className="text-sm text-gray-800 font-semibold mt-2">
          Kim Fournais, <span className="font-normal">Founder and CEO</span>
        </p>
      </div>

      {/* RIGHT SIDE - TEXT + ACCORDION */}
      <div>
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-8">
          Our reputation is built <br /> on trust
        </h2>

        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-3">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg text-gray-900 font-medium">
                  {item.title}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-gray-600" size={20} />
                ) : (
                  <ChevronDown className="text-gray-600" size={20} />
                )}
              </button>

              {openIndex === index && (
                <p className="mt-2 text-gray-700 text-sm">{item.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <button onClick={()=>navigate('/signUp')}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Open account
          </button>
          <a
            href="#"
            className="flex items-center text-blue-600 font-medium hover:underline"
          >
            Learn more about Saxo <ArrowRight size={18} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
