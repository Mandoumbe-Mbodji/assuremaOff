import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00699B] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/logoassurema.jpg" 
                alt="Assurema" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Nous offrons des solutions d'assurance auto adaptées à vos besoins, avec une 
              protection complète et des tarifs compétitifs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#FF9100] transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF9100] transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#FF9100] transition duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/insurance-form" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  Devis en ligne
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  Mon espace client
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  À propos de nous
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  Assurance responsabilité civile
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  Assurance tous risques
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  Assistance 24/7
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF9100] transition duration-300">
                  Protection juridique
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>contact@assurema.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Avenue des Assurances, 75001 Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Assurema. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;