import React from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const guaranteeOptions = [
  { id: 'responsabiliteCivile', label: 'Responsabilité Civile', description: 'Couvre les dommages causés à autrui' },
  { id: 'dommagesCollision', label: 'Dommages Collision', description: 'Couvre les dommages en cas de collision' },
  { id: 'volIncendie', label: 'Vol et Incendie', description: 'Protection contre le vol et les incendies' },
  { id: 'briseGlace', label: 'Brise de Glace', description: 'Réparation ou remplacement des vitres' },
  { id: 'catastropheNaturelle', label: 'Catastrophes Naturelles', description: 'Couverture des dégâts causés par des catastrophes naturelles' },
  { id: 'assistanceRoutiere', label: 'Assistance Routière', description: 'Service d\'assistance en cas de panne' },
  { id: 'protectionConducteur', label: 'Protection du Conducteur', description: 'Indemnisation du conducteur en cas de blessures' },
  { id: 'protectionJuridique', label: 'Protection Juridique', description: 'Assistance juridique en cas de litige' },
];

const PolicyForm: React.FC = () => {
  const { insuranceData, updatePolicyData } = useInsurance();
  const { policy } = insuranceData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updatePolicyData({ [name]: value });
  };

  const handleGuaranteeChange = (id: string, value: number) => {
    updatePolicyData({
      guarantees: {
        ...policy.guarantees,
        [id]: value
      }
    });
  };

  const handlePeriodicityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const periodicityType = e.target.value as 'days' | 'months';
    updatePolicyData({
      periodicity: {
        type: periodicityType,
        value: policy.periodicity?.value || 1,
      }
    });
  };

  const handlePeriodicityValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value <= 0) return;
    
    updatePolicyData({
      periodicity: {
        type: policy.periodicity?.type || 'months',
        value,
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-[#0F3460]">Garanties et Options</h2>
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom de la police*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={policy.name || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Durée (en mois)*
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="1"
            max="12"
            value={policy.duration || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de police
          </label>
          <input
            type="text"
            id="policyNumber"
            name="policyNumber"
            value={policy.policyNumber || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="periodicityType" className="block text-sm font-medium text-gray-700 mb-1">
            Type de périodicité*
          </label>
          <select
            id="periodicityType"
            value={policy.periodicity?.type || 'months'}
            onChange={handlePeriodicityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          >
            <option value="days">Jours</option>
            <option value="months">Mois</option>
          </select>
        </div>

        <div>
          <label htmlFor="periodicityValue" className="block text-sm font-medium text-gray-700 mb-1">
            Valeur de périodicité*
          </label>
          <input
            type="number"
            id="periodicityValue"
            min="1"
            value={policy.periodicity?.value || ''}
            onChange={handlePeriodicityValueChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>
      </div>

      <h3 className="font-medium text-gray-800 mb-3">Niveaux de garantie</h3>
      <p className="text-sm text-gray-600 mb-4">
        Sélectionnez le niveau de couverture pour chaque garantie (1 = minimum, 8 = maximum)
      </p>
      
      <div className="space-y-4">
        {guaranteeOptions.map((guarantee) => (
          <div key={guarantee.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex items-start">
              <div className="flex-grow">
                <h4 className="font-medium text-gray-800">{guarantee.label}</h4>
                <p className="text-sm text-gray-600">{guarantee.description}</p>
              </div>
              <div className="ml-4">
                <select
                  value={policy.guarantees?.[guarantee.id] || 1}
                  onChange={(e) => handleGuaranteeChange(guarantee.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">* Champs obligatoires</p>
    </div>
  );
};

export default PolicyForm;