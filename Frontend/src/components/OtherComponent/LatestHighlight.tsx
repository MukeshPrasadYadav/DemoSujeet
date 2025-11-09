import React from "react";
import { ArrowRight } from "lucide-react";

const LatestHighlights = () => {
  const highlights = [
    {
      img: "https://www.home.saxo/-/media/images/outrageous-predictions/2025/op25-hero-image.svg?la=en&amp;mw=1280&amp;hash=CB3138282484882BA534D8972C87A34E", // replace with your own image
      title: "Outrageous Predictions 2025",
      description:
        "An outspoken and outrageous look at the future that may await us.",
      linkText: "Check our predictions",
      linkHref: "#",
    },
    {
      img: "https://www.home.saxo/-/media/images/frontpage/redesign-2024/demo-highlights-d.jpg?la=en&amp;h=200&amp;mw=1280&amp;w=347&amp;hash=65EECE81C19994084BA0B96EB11E4BFE", // replace with your own image
      title: "Demo account",
      description:
        "Sign up for a 20-day demo account to try out trading in our platform with a simulated USD 100,000.",
      linkText: "Sign up for demo",
      linkHref: "#",
    },
    {
      img: "https://www.home.saxo/-/media/images/frontpage/redesign-2024/referral-highlights-gl-d.jpg?la=en&amp;h=195&amp;mw=1280&amp;w=347&amp;hash=503703CC64F55D80F717040C98EDE34F", // replace with your own image
      title: "Refer a friend",
      description:
        "Check out our referral program and share Saxo with your friends. (Terms depend on country of residence.)",
      linkText: "Get referral program details",
      linkHref: "#",
    },
  ];

  return (
    <section className="bg-[#e9efff] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-semibold text-gray-900 mb-12">
          Latest highlights
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="bg-white  rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              {/* Content */}
              <div className="p-6 ">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                </div>
                <a
                  href={item.linkHref}
                  className="text-blue-600 font-medium hover:underline inline-flex items-center"
                >
                  {item.linkText}
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestHighlights;
