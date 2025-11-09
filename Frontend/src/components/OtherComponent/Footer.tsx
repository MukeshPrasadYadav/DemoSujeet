import React from "react";
import {
  Facebook,
  Linkedin,
  Twitter,
  Globe,
  AlertTriangle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f1113] text-gray-400 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10">
          {/* Column 1: Company Info */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">SAXO</h2>
            <p className="text-sm leading-relaxed">
              Saxo Bank A/S <br />
              (Headquarters) <br />
              Philip Heymans Alle 15 <br />
              2900 Hellerup <br />
              Denmark
            </p>

            <a
              href="#"
              className="text-white mt-3 inline-block font-medium hover:underline"
            >
              Contact Saxo
            </a>

            <div className="mt-6">
              <p className="text-sm font-medium text-white mb-2">
                Select region
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Globe size={16} />
                <span>International</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Pricing */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Pricing</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Commissions and spreads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  General charges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Account tiers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Account Types */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">
              Account types
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Individual account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Corporate account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Joint account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Professional status
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: About Saxo */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">
              About Saxo
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Visit our help center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Refer a friend
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Saxo for institutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Saxo on TradingView
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="text-center md:text-left py-6 border-b border-gray-700 text-sm space-y-2">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            {[
              "Full disclaimer",
              "Non-independent research disclaimer",
              "Risk information",
              "Saxo compliance",
              "Terms of use",
              "Privacy policy",
              "Cookie policy",
              "Investor relations",
              "Licences and regulation",
              "Protection of funds",
              "General business terms",
              "Key information documents (KIDs)",
              "Complaints",
              "Accessibility statement",
            ].map((link, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-10 space-y-4 text-sm leading-relaxed">
          <div className="flex items-start gap-2 text-orange-500 font-semibold">
            <AlertTriangle size={18} className="flex-shrink-0 mt-[2px]" />
            <p>
              All trading and investing comes with risk, including but not
              limited to the potential to lose your entire invested amount.
            </p>
          </div>

          <p className="text-gray-400">
            Information on our international website (as selected from the globe
            drop-down) can be accessed worldwide and relates to Saxo Bank A/S as
            the parent company of the Saxo Bank Group. Any mention of the Saxo
            Bank Group refers to the overall organisation, including
            subsidiaries and branches under Saxo Bank A/S. Client agreements are
            made with the relevant Saxo entity based on your country of
            residence and are governed by the applicable laws of that entity’s
            jurisdiction.
          </p>

          <p className="text-gray-500 text-xs">
            Apple and the Apple logo are trademarks of Apple Inc., registered in
            the US and other countries. App Store is a service mark of Apple
            Inc. Google Play and the Google Play logo are trademarks of Google
            LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
