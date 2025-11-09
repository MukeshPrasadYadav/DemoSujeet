import { Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Providers/AuthProvide";

const Header = () => {
  const navigate=useNavigate();
  const {isAuthenticated,logout}=useAuth();
  return (
    <header className="w-full fixed left-0 right-0 top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-[#00156A] tracking-tight">
            SAXO
          </h1>
          <span className="text-[10px] text-[#00156A] font-semibold uppercase">
            Be Invested
          </span>
        </div>

        {/* Middle: Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-[#00156A] font-medium text-sm">
          <a href="#" className="hover:text-[#0040FF]">Investing</a>
          <a href="#" className="hover:text-[#0040FF]">Trading</a>
          <a href="#" className="hover:text-[#0040FF]">Pricing</a>
          <a href="#" className="hover:text-[#0040FF]">About</a>
          <a href="#" className="hover:text-[#0040FF]">Help</a>
          <a href="#" className="hover:text-[#0040FF]">For institutions</a>
        </nav>

        {/* Right: Icons and Buttons */}
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-[#00156A] cursor-pointer" />
          <Globe className="w-5 h-5 text-[#00156A] cursor-pointer" />
        <Button
  onClick={() => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  }}
  variant="outline"
  className="border-[#00156A] text-[#00156A] hover:bg-[#00156A] hover:text-white text-sm px-4 py-1"
>
  {isAuthenticated ? 'Log Out' : 'Login'}
</Button>

          {
            !isAuthenticated && <Button 
          onClick={()=>navigate('/signUp')}
           className="bg-[#0040FF] hover:bg-[#0030CC] text-white text-sm px-4 py-1">
            Open account
          </Button>
          }
          
        </div>
      </div>
    </header>
  );
};

export default Header;
