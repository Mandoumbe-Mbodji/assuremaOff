import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/logoassurema.jpg" 
              alt="Assurema" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" label="Accueil" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/insurance-form" label="Devis" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/dashboard" label="Mon Espace" currentPath={location.pathname} onClick={closeMenu} />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              <NavLink to="/" label="Accueil" currentPath={location.pathname} onClick={closeMenu} />
              <NavLink to="/insurance-form" label="Devis" currentPath={location.pathname} onClick={closeMenu} />
              <NavLink to="/dashboard" label="Mon Espace" currentPath={location.pathname} onClick={closeMenu} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath, onClick }) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`transition duration-200 hover:text-[#FF6E31] ${
        isActive ? 'text-[#FF6E31] font-semibold' : 'text-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;