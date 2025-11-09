import React from "react";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  const cards = [
    {
      flag: "🇪🇺",
      title: "Stocks",
      subtitle: "Euronext exchanges",
      price: "EUR 2",
      note: "See stock prices",
    },
    {
      flag: "🇺🇸",
      title: "Stocks",
      subtitle: "Main US exchanges",
      price: "USD 1",
      note: "See stock prices",
    },
    {
      flag: "💶",
      title: "Bonds",
      subtitle: "",
      price: "EUR 20",
      note: "See bond prices",
    },
    {
      flag: "📊",
      title: "EUR stock options",
      subtitle: "Commission per contract",
      price: "EUR 0.75",
      note: "See option prices",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left side */}
      <div className="flex flex-col">
        <p className="text-sm uppercase font-semibold text-gray-500 tracking-wide mb-2">
          Pricing
        </p>
        <h2 className="text-4xl md:text-5xl  text-gray-900 leading-tight mb-6">
          Lower fees, greater <br /> investing power
        </h2>

        <ul className="space-y-3 mb-6">
          <li className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="text-blue-600" size={18} />
            Low commissions for all asset classes
          </li>
          <li className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="text-blue-600" size={18} />
            No platform or inactivity fees
          </li>
          <li className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="text-blue-600" size={18} />
            No minimum initial funding
          </li>
        </ul>

        <button className="border w-50 border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
          See all product fees
        </button>
      </div>

      {/* Right side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-[#f9f5f1] rounded-lg p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition"
          >
            <div>
              <div className="text-3xl mb-3">{card.flag}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-gray-700 mb-2">{card.subtitle}</p>
              )}
              <p className="text-sm text-gray-600 mb-1">Commissions from</p>
              <p className="text-3xl font-semibold text-gray-800 mb-2">
                {card.price}
              </p>
            </div>
            <a
              href="#"
              className="text-blue-600 font-medium hover:underline mt-auto"
            >
              {card.note}
            </a>
          </div>
        ))}

        <div className="md:col-span-2 text-sm text-gray-500 mt-8 text-center md:text-left">
        Please note, these prices are indicative and may vary according to your
        country of residence.
      </div>
      </div>

      {/* Footer note */}
      
    </section>
  );
};

export default PricingSection;
