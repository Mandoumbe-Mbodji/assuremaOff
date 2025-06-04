import React from 'react';
import { useInsurance } from '../../context/InsuranceContext';

const VehicleInfoForm: React.FC = () => {
  const { insuranceData, updateVehicleData } = useInsurance();
  const { vehicle } = insuranceData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateVehicleData({ [name]: value });
  };

  const handlePeriodicityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const periodicityType = e.target.value as 'days' | 'months';
    updateVehicleData({
      periodicity: {
        type: periodicityType,
        value: vehicle.periodicity?.value || 1,
      }
    });
  };

  const handlePeriodicityValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value <= 0) return;
    
    updateVehicleData({
      periodicity: {
        type: vehicle.periodicity?.type || 'months',
        value,
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-[#0F3460]">Informations du véhicule</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Marque*
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={vehicle.brand || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Modèle*
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={vehicle.model || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="fiscalPower" className="block text-sm font-medium text-gray-700 mb-1">
            Puissance fiscale*
          </label>
          <input
            type="number"
            id="fiscalPower"
            name="fiscalPower"
            min="1"
            value={vehicle.fiscalPower || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="energyType" className="block text-sm font-medium text-gray-700 mb-1">
            Type d'énergie*
          </label>
          <select
            id="energyType"
            name="energyType"
            value={vehicle.energyType || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          >
            <option value="">Sélectionnez</option>
            <option value="diesel">Diesel</option>
            <option value="essence">Essence</option>
            <option value="electric">Électrique</option>
          </select>
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre du véhicule*
          </label>
          <select
            id="genre"
            name="genre"
            value={vehicle.genre || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          >
            <option value="">Sélectionnez</option>
            <optgroup label="C1 - Véhicule Particulier">
              <option value="VP">Véhicule Particulier</option>
            </optgroup>
            <optgroup label="C2 - Véhicules utilitaires">
              <option value="TPC">Véhicules utilitaires à carrosserie Tourisme</option>
              <option value="TPC3T500">Véhicules utilitaires autres carrosseries jusqu'à 3T 500</option>
              <option value="TPC3T500P">Véhicules utilitaires autres carrosseries au-delà de 3T 500</option>
            </optgroup>
            <optgroup label="C3 - Transport public">
              <option value="TPM3T500">Véhicules transports publics de marchandises jusqu'à 3T 500</option>
              <option value="TPM3T500P">Véhicules transports publics de marchandises au-delà de 3T 500</option>
            </optgroup>
            <optgroup label="C4 - Transport de personnes">
              <option value="TPV8">Transport de personnes à titre onéreux - 8 places au plus</option>
              <option value="TPV9">Transport de personnes à titre onéreux - 9 places et plus</option>
            </optgroup>
            <optgroup label="C5 - Deux/trois roues">
              <option value="2RCYC">Cyclomoteurs</option>
              <option value="2RSCO">Scooters et vélomoteurs jusqu'à 125 cm3</option>
              <option value="2RMOT">Motocyclettes et scooters de plus de 125 cm3</option>
              <option value="2RSID">Side-cars (toutes cylindrées)</option>
            </optgroup>
            <optgroup label="C6 - Garage">
              <option value="C6-WG-4R">Garage Véhicule à 04 roues</option>
              <option value="C6-WG-ATELIER-AUTRE">Garage Véhicule à 02 ou 03 roues pour atelier autre</option>
            </optgroup>
            <optgroup label="C7 - Auto-école">
              <option value="C7-AE-SC-VTSDC_2R">Side-cars Sans Double Commande</option>
              <option value="C7-AE-VTADC">Véhicule de Tourisme Avec Double Commande</option>
              <option value="C7-AE-VTADC_TPC">Véhicule des catégories 2, 3 Avec Double Commande</option>
              <option value="C7-AE-VTSDC">Véhicule de Tourisme Sans Double Commande</option>
              <option value="C7-AE-VTSDC_TPC">Véhicule des catégories 2, 3 Sans Double Commande</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-1">
            Immatriculation*
          </label>
          <input
            type="text"
            id="registration"
            name="registration"
            value={vehicle.registration || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de places
          </label>
          <input
            type="number"
            id="seats"
            name="seats"
            min="1"
            max="9"
            value={vehicle.seats || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="circulationDate" className="block text-sm font-medium text-gray-700 mb-1">
            Date de mise en circulation
          </label>
          <input
            type="date"
            id="circulationDate"
            name="circulationDate"
            value={vehicle.circulationDate || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
          />
        </div>

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
            value={vehicle.duration || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="periodicityType" className="block text-sm font-medium text-gray-700 mb-1">
            Type de périodicité*
          </label>
          <select
            id="periodicityType"
            value={vehicle.periodicity?.type || 'months'}
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
            value={vehicle.periodicity?.value || ''}
            onChange={handlePeriodicityValueChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
            required
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">* Champs obligatoires</p>
    </div>
  );
};

export default VehicleInfoForm;