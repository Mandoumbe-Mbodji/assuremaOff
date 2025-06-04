import React from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const PersonalInfoForm: React.FC = () => {
  const { insuranceData, updateSubscriberData, updateInsuredData } = useInsurance();
  const { subscriber, insured } = insuranceData;
  const [sameAsSubscriber, setSameAsSubscriber] = React.useState(false);

  const handleSubscriberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSubscriberData({ [name]: value });
    
    if (sameAsSubscriber) {
      updateInsuredData({ [name]: value });
    }
  };

  const handleInsuredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateInsuredData({ [name]: value });
  };

  const handleSameAsSubscriberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsSubscriber(checked);
    
    if (checked) {
      updateInsuredData({
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        mobile: subscriber.mobile,
        email: subscriber.email,
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-[#0F3460]">Informations personnelles</h2>
      
      <div className="mb-8">
        <h3 className="font-medium text-gray-800 mb-4">Information du souscripteur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="subscriberFirstName" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom*
            </label>
            <input
              type="text"
              id="subscriberFirstName"
              name="firstName"
              value={subscriber.firstName || ''}
              onChange={handleSubscriberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="subscriberLastName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom*
            </label>
            <input
              type="text"
              id="subscriberLastName"
              name="lastName"
              value={subscriber.lastName || ''}
              onChange={handleSubscriberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="subscriberMobile" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone portable*
            </label>
            <input
              type="tel"
              id="subscriberMobile"
              name="mobile"
              value={subscriber.mobile || ''}
              onChange={handleSubscriberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="subscriberEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              id="subscriberEmail"
              name="email"
              value={subscriber.email || ''}
              onChange={handleSubscriberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sameAsSubscriber"
            checked={sameAsSubscriber}
            onChange={handleSameAsSubscriberChange}
            className="h-4 w-4 text-[#0F3460] focus:ring-[#20BDBE] border-gray-300 rounded"
          />
          <label htmlFor="sameAsSubscriber" className="ml-2 block text-sm text-gray-700">
            L'assuré est le même que le souscripteur
          </label>
        </div>

        {!sameAsSubscriber && (
          <>
            <h3 className="font-medium text-gray-800 mb-4">Information de l'assuré</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="insuredFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom*
                </label>
                <input
                  type="text"
                  id="insuredFirstName"
                  name="firstName"
                  value={insured.firstName || ''}
                  onChange={handleInsuredChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="insuredLastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom*
                </label>
                <input
                  type="text"
                  id="insuredLastName"
                  name="lastName"
                  value={insured.lastName || ''}
                  onChange={handleInsuredChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="insuredMobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone portable*
                </label>
                <input
                  type="tel"
                  id="insuredMobile"
                  name="mobile"
                  value={insured.mobile || ''}
                  onChange={handleInsuredChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="insuredEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  id="insuredEmail"
                  name="email"
                  value={insured.email || ''}
                  onChange={handleInsuredChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                  required
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="termsAgreement"
            className="h-4 w-4 mt-1 text-[#0F3460] focus:ring-[#20BDBE] border-gray-300 rounded"
          />
          <label htmlFor="termsAgreement" className="ml-2 block text-sm text-gray-700">
            J'accepte les <a href="#" className="text-[#0F3460] hover:underline">conditions générales</a> et la <a href="#" className="text-[#0F3460] hover:underline">politique de confidentialité</a>. Je comprends que mes données seront utilisées pour générer un devis d'assurance.
          </label>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">* Champs obligatoires</p>
    </div>
  );
};

export default PersonalInfoForm;