import { BarChart3, Coins, Globe, Shield } from "lucide-react";
import { Card } from "./Card";

export const CardSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
      <Card
        icon={<Globe size={22} />}
        text="All the products and markets you want in one place"
      />
      <Card
        icon={<BarChart3 size={22} />}
        text="Intuitive platform with helpful tools and insights"
      />
      <Card
        icon={<Coins size={22} />}
        text="Pricing you can trust — low and transparent fees"
      />
      <Card
        icon={<Shield size={22} />}
        text="Your money is safe with a trusted global broker"
      />
    </div>
  );
};