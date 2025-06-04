import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, CheckCircle, Phone } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0F3460] to-[#162955] text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Protection complète pour votre véhicule
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Obtenez une assurance auto adaptée à vos besoins avec une couverture optimale et des tarifs compétitifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/insurance-form"
                className="bg-[#FF6E31] hover:bg-[#e05a20] text-white font-semibold py-3 px-6 rounded-md transition duration-300 text-center flex items-center justify-center"
              >
                Obtenir un devis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#whatsapp"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0F3460] text-white font-semibold py-3 px-6 rounded-md transition duration-300 text-center flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" /> Via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0F3460]">Pourquoi choisir AssurAuto?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre objectif est de vous offrir la meilleure protection pour votre véhicule avec un processus simple et transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-[#20BDBE]" />}
              title="Protection Complète"
              description="Des garanties adaptées à vos besoins spécifiques pour une protection optimale de votre véhicule."
            />
            <FeatureCard
              icon={<Clock className="h-12 w-12 text-[#20BDBE]" />}
              title="Processus Rapide"
              description="Obtenez votre devis en quelques minutes et finalisez votre assurance en toute simplicité."
            />
            <FeatureCard
              icon={<CheckCircle className="h-12 w-12 text-[#20BDBE]" />}
              title="Service Fiable"
              description="Une assistance disponible 24/7 et un traitement efficace des sinistres pour votre tranquillité d'esprit."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#0F3460]">Comment ça marche?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un processus simple en trois étapes pour obtenir votre assurance auto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Renseignez vos informations"
              description="Fournissez les détails de votre véhicule et vos besoins d'assurance via notre formulaire ou WhatsApp."
            />
            <StepCard
              number="2"
              title="Obtenez votre devis"
              description="Recevez instantanément un devis personnalisé basé sur vos informations et vos besoins."
            />
            <StepCard
              number="3"
              title="Souscrivez en ligne"
              description="Finalisez votre souscription en quelques clics et recevez immédiatement votre attestation."
            />
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section id="whatsapp" className="py-20 bg-[#20BDBE] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Commencez avec WhatsApp</h2>
            <p className="text-xl mb-8">
              Démarrez votre parcours d'assurance directement depuis WhatsApp. 
              Notre chatbot vous guidera à travers le processus initial.
            </p>
            <a
              href="https://wa.me/1234567890"
              className="bg-white text-[#20BDBE] hover:bg-gray-100 font-semibold py-3 px-8 rounded-md transition duration-300 inline-flex items-center"
            >
              <Phone className="mr-2 h-5 w-5" /> Démarrer sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-[#0F3460] rounded-lg p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à protéger votre véhicule?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Obtenez un devis personnalisé en quelques minutes et bénéficiez d'une couverture adaptée à vos besoins.
            </p>
            <Link
              to="/insurance-form"
              className="bg-[#FF6E31] hover:bg-[#e05a20] text-white font-semibold py-3 px-8 rounded-md transition duration-300 inline-flex items-center"
            >
              Obtenir mon devis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-[#0F3460]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#0F3460] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-[#0F3460]">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default HomePage;