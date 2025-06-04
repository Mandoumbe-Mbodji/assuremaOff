import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInsurance } from '../context/InsuranceContext';
import { CreditCard, Check, Lock } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { insuranceData } = useInsurance();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  // Mock data
  const selectedPlan = {
    name: 'Standard',
    price: 1250,
    periodicity: insuranceData.vehicle.periodicity?.type || 'months',
  };

  const handlePaymentMethodChange = (method: 'card' | 'bank') => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-[#0F3460] text-center">Finaliser votre achat</h1>
          <p className="text-gray-600 mb-8 text-center">
            Complétez votre paiement pour activer votre assurance
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Formule</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Véhicule</span>
                      <span className="font-medium">{insuranceData.vehicle.brand} {insuranceData.vehicle.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée</span>
                      <span className="font-medium">{insuranceData.vehicle.duration} mois</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{selectedPlan.price} €</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Taxes</span>
                      <span>0 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frais de dossier</span>
                      <span>0 €</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span>{selectedPlan.price} €</span>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-600 flex items-center">
                    <Lock className="h-4 w-4 mr-1 text-[#0F3460]" />
                    Paiement sécurisé
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Méthode de paiement</h2>
                  
                  <div className="flex space-x-4 mb-6">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodChange('card')}
                      className={`flex-1 py-3 rounded-md text-center flex items-center justify-center transition duration-200 ${
                        paymentMethod === 'card'
                          ? 'bg-[#0F3460] text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Carte bancaire
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodChange('bank')}
                      className={`flex-1 py-3 rounded-md text-center flex items-center justify-center transition duration-200 ${
                        paymentMethod === 'bank'
                          ? 'bg-[#0F3460] text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Virement bancaire
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom sur la carte*
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de carte*
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'expiration*
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/AA"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV*
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-[#0F3460] hover:bg-[#0a2647] text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                              <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Traitement en cours...
                          </>
                        ) : (
                          <>
                            Payer {selectedPlan.price} €
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {paymentMethod === 'bank' && (
                    <div>
                      <p className="mb-4 text-gray-700">
                        Pour effectuer un virement bancaire, veuillez utiliser les coordonnées bancaires suivantes :
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <p className="mb-2"><span className="font-medium">Bénéficiaire :</span> AssurAuto</p>
                        <p className="mb-2"><span className="font-medium">IBAN :</span> FR76 1234 5678 9012 3456 7890 123</p>
                        <p className="mb-2"><span className="font-medium">BIC :</span> ASSUFRPP</p>
                        <p><span className="font-medium">Référence :</span> {insuranceData.vehicle.registration}</p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-6">
                        <span className="font-medium">Note:</span> Votre assurance sera activée après réception et validation de votre paiement. Ce processus peut prendre jusqu'à 48 heures ouvrées.
                      </p>
                      
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-[#0F3460] hover:bg-[#0a2647] text-white font-semibold py-3 px-6 rounded-md transition duration-300"
                      >
                        Confirmer le paiement par virement
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Garanties et conditions</h2>
                  
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Votre assurance sera active immédiatement après confirmation du paiement</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>L'attestation d'assurance sera disponible dans votre espace personnel</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Vous pouvez annuler votre contrat à tout moment depuis votre espace client</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Assistance disponible 24/7 en cas de sinistre</span>
                    </li>
                  </ul>
                  
                  <div className="text-sm text-gray-600">
                    En procédant au paiement, vous acceptez nos <a href="#" className="text-[#0F3460] hover:underline">conditions générales</a> et notre <a href="#" className="text-[#0F3460] hover:underline">politique de confidentialité</a>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;