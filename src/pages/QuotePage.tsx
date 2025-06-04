import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInsurance } from '../context/InsuranceContext';
import { ArrowRight, Shield, Check, ChevronDown, ChevronUp } from 'lucide-react';

const QuotePage: React.FC = () => {
  const navigate = useNavigate();
  const { insuranceData } = useInsurance();
  const [selectedPlan, setSelectedPlan] = React.useState<string>('standard');
  const [showDetails, setShowDetails] = React.useState(false);

  // Mock data for different insurance plans
  const plans = {
    basic: {
      name: 'Essentiel',
      price: 880,
      features: [
        'Responsabilité Civile',
        'Assistance routière de base',
        'Protection juridique minimale'
      ],
      level: 'basic'
    },
    standard: {
      name: 'Standard',
      price: 1250,
      features: [
        'Toutes les garanties Essentiel',
        'Dommages collision',
        'Vol et incendie',
        'Bris de glace'
      ],
      level: 'recommended'
    },
    premium: {
      name: 'Premium',
      price: 1580,
      features: [
        'Toutes les garanties Standard',
        'Protection conducteur étendue',
        'Véhicule de remplacement',
        'Catastrophes naturelles',
        'Assistance premium 24/7'
      ],
      level: 'premium'
    }
  };

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    navigate('/checkout');
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Calculate savings compared to premium plan
  const calculateSavings = (planPrice: number) => {
    const premiumPrice = plans.premium.price;
    return premiumPrice - planPrice;
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-[#0F3460] text-center">Votre devis d'assurance</h1>
          <p className="text-gray-600 mb-8 text-center">
            Basé sur les informations fournies pour votre {insuranceData.vehicle.brand} {insuranceData.vehicle.model}
          </p>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Récapitulatif du véhicule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Marque / Modèle</p>
                  <p className="font-medium">{insuranceData.vehicle.brand} {insuranceData.vehicle.model}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Immatriculation</p>
                  <p className="font-medium">{insuranceData.vehicle.registration}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Puissance fiscale</p>
                  <p className="font-medium">{insuranceData.vehicle.fiscalPower} CV</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Type d'énergie</p>
                  <p className="font-medium">
                    {insuranceData.vehicle.energyType === 'diesel' ? 'Diesel' : 
                     insuranceData.vehicle.energyType === 'essence' ? 'Essence' : 'Électrique'}
                  </p>
                </div>
              </div>

              <button 
                onClick={toggleDetails}
                className="mt-4 flex items-center text-[#0F3460] hover:text-[#20BDBE] transition duration-300"
              >
                {showDetails ? 'Masquer les détails' : 'Afficher plus de détails'}
                {showDetails ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>

              {showDetails && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Genre</p>
                      <p className="font-medium">{insuranceData.vehicle.genre}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Durée</p>
                      <p className="font-medium">{insuranceData.vehicle.duration} mois</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Périodicité</p>
                      <p className="font-medium">
                        {insuranceData.vehicle.periodicity?.value} {insuranceData.vehicle.periodicity?.type === 'months' ? 'mois' : 'jours'}
                      </p>
                    </div>
                    {insuranceData.vehicle.seats && (
                      <div>
                        <p className="text-gray-600 text-sm">Nombre de places</p>
                        <p className="font-medium">{insuranceData.vehicle.seats}</p>
                      </div>
                    )}
                    {insuranceData.vehicle.circulationDate && (
                      <div>
                        <p className="text-gray-600 text-sm">Date de mise en circulation</p>
                        <p className="font-medium">{insuranceData.vehicle.circulationDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-center">Choisissez votre formule</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(plans).map(([key, plan]) => (
              <div 
                key={key}
                className={`bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                  selectedPlan === key 
                    ? 'border-2 border-[#0F3460] shadow-lg' 
                    : 'border border-gray-200 shadow-md'
                }`}
                onClick={() => handlePlanSelection(key)}
              >
                {plan.level === 'recommended' && (
                  <div className="bg-[#0F3460] text-white text-center py-1 text-sm font-medium">
                    Recommandé
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <Shield className={`h-6 w-6 ${
                      plan.level === 'basic' ? 'text-gray-400' : 
                      plan.level === 'recommended' ? 'text-[#0F3460]' : 
                      'text-[#FF6E31]'
                    }`} />
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price} €</span>
                    <span className="text-gray-600 text-sm">/{insuranceData.vehicle.periodicity?.type === 'months' ? 'mois' : 'jour'}</span>
                  </div>
                  
                  {plan.level !== 'premium' && (
                    <p className="text-green-600 text-sm mb-4">
                      Économisez {calculateSavings(plan.price)} € par rapport à Premium
                    </p>
                  )}
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-2 rounded-md text-center font-medium ${
                      selectedPlan === key
                        ? 'bg-[#0F3460] text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPlan === key ? 'Sélectionné' : 'Sélectionner'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-[#0F3460] hover:bg-[#0a2647] text-white font-semibold py-3 px-8 rounded-md transition duration-300 inline-flex items-center"
            >
              Continuer <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;