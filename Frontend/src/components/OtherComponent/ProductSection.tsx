import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Product {
  title: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  extraLinks?: { name: string; href: string }[];
}

const products: Product[] = [
  {
    title: "Stocks",
    description: "Stocks from New York, Hong Kong, London, and 50+ other global markets.",
    linkText: "Explore stocks",
    linkHref: "#",
  },
  {
    title: "ETFs",
     description: "Diversified exposure across global markets and major sectors like tech, healthcare, and more.",
    linkText: "Explore ETFs",
    linkHref: "#",
  },
  {
    title: "Bonds",
     description: "More than 5,200 government and corporate bonds available across exchanges and OTC markets.",
    linkText: "Explore Bonds",
    linkHref: "#",
  },
  {
    title: "Mutual funds",
    description:
      "Highly rated funds from some of the world’s top money managers.",
    linkText: "Explore mutual funds",
    linkHref: "#",
  },
  {
    title: "More products",
    extraLinks: [
      { name: "Options", href: "#" },
      { name: "Futures", href: "#" },
      { name: "Forex", href: "#" },
      { name: "CFDs", href: "#" },
      { name: "Commodities", href: "#" },
    ],
  },
];

const ProductSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left side - Heading */}
      <div className="flex items-start justify-center md:justify-start">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Find every product <br /> you want to trade
        </h2>
      </div>

      {/* Right side - Product list */}
      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={index}>
            {/* Header */}
            <div
              className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200"
              onClick={() => toggle(index)}
            >
              <h3 className="text-lg font-medium text-gray-900">
                {product.title}
              </h3>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-gray-600" />
              ) : (
                <ChevronDown size={20} className="text-gray-600" />
              )}
            </div>

            {/* Expanded content */}
            {openIndex === index && (
              <div className="mt-2 text-gray-700">
                {product.description && (
                  <p className="mb-2">{product.description}</p>
                )}
                {product.linkText && (
                  <a
                    href={product.linkHref}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {product.linkText}
                  </a>
                )}
                {product.extraLinks && (
                  <div className="flex flex-wrap gap-4 mt-1">
                    {product.extraLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
