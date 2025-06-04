import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInsurance } from '../context/InsuranceContext';
import VehicleInfoForm from '../components/forms/VehicleInfoForm';
import PolicyForm from '../components/forms/PolicyForm';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';

const InsuranceFormPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { insuranceData, setCivilLiability } = useInsurance();

  const totalSteps = 3;

  const fetchCivilLiability = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Mock response
      const mockResponse = {
        civilLiabilityAmount: 1250,
        details: {
          basePremium: 1000,
          taxes: 250,
          discounts: 0
        }
      };
      setCivilLiability(mockResponse);
      setIsLoading(false);
      return mockResponse;
    } catch (error) {
      console.error('Error fetching civil liability:', error);
      setIsLoading(false);
      return null;
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      // Fetch civil liability after vehicle info is provided
      const liability = await fetchCivilLiability();
      if (!liability) return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/quote');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-[#0F3460] text-center">Obtenir un devis</h1>
          <p className="text-gray-600 mb-8 text-center">
            Fournissez les informations nécessaires pour obtenir un devis personnalisé
          </p>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-center w-8 h-8 rounded-full 
                    ${index + 1 <= step ? 'bg-[#0F3460] text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-[#0F3460] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Véhicule</span>
              <span>Garanties</span>
              <span>Informations</span>
            </div>
          </div>

          {/* Form content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {step === 1 && <VehicleInfoForm />}
            {step === 2 && <PolicyForm />}
            {step === 3 && <PersonalInfoForm />}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className={`px-6 py-2 rounded-md ${
                  step === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                disabled={step === 1 || isLoading}
              >
                Précédent
              </button>
              <button
                onClick={handleNext}
                className="bg-[#0F3460] text-white px-6 py-2 rounded-md hover:bg-[#0a2647] transition duration-300 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement...
                  </>
                ) : (
                  step === totalSteps ? 'Voir mon devis' : 'Suivant'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceFormPage;