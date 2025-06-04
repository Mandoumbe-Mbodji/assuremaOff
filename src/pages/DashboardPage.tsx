import React, { useState } from 'react';
import { useInsurance } from '../context/InsuranceContext';
import { FileText, Car, User, CreditCard, Bell, Settings, ChevronRight, Download, Shield } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { insuranceData } = useInsurance();
  const [activeTab, setActiveTab] = useState('policies');

  // Mock policy data
  const policies = [
    {
      id: 'POL-1234',
      vehicle: insuranceData.vehicle.brand && insuranceData.vehicle.model 
        ? `${insuranceData.vehicle.brand} ${insuranceData.vehicle.model}` 
        : 'Renault Clio',
      registration: insuranceData.vehicle.registration || 'AB-123-CD',
      startDate: '01/06/2023',
      endDate: '31/05/2024',
      status: 'active',
      premium: 1250,
      type: 'Standard'
    }
  ];

  // Mock payment data
  const payments = [
    {
      id: 'PMT-4567',
      date: '01/06/2023',
      amount: 1250,
      method: 'Carte bancaire',
      status: 'success'
    }
  ];

  // Mock claims data
  const claims = [];

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-[#0F3460]">Mon espace client</h1>
          <p className="text-gray-600 mb-8">
            Gérez vos polices d'assurance, consultez vos documents et suivez vos paiements
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0F3460] text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {insuranceData.subscriber.firstName 
                          ? `${insuranceData.subscriber.firstName} ${insuranceData.subscriber.lastName}`
                          : 'Jean Dupont'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {insuranceData.subscriber.email || 'client@example.com'}
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="p-2">
                  <DashboardNavItem
                    icon={<Shield className="h-5 w-5" />}
                    label="Mes polices"
                    isActive={activeTab === 'policies'}
                    onClick={() => setActiveTab('policies')}
                  />
                  <DashboardNavItem
                    icon={<FileText className="h-5 w-5" />}
                    label="Documents"
                    isActive={activeTab === 'documents'}
                    onClick={() => setActiveTab('documents')}
                  />
                  <DashboardNavItem
                    icon={<CreditCard className="h-5 w-5" />}
                    label="Paiements"
                    isActive={activeTab === 'payments'}
                    onClick={() => setActiveTab('payments')}
                  />
                  <DashboardNavItem
                    icon={<Car className="h-5 w-5" />}
                    label="Sinistres"
                    isActive={activeTab === 'claims'}
                    onClick={() => setActiveTab('claims')}
                  />
                  <DashboardNavItem
                    icon={<Bell className="h-5 w-5" />}
                    label="Notifications"
                    isActive={activeTab === 'notifications'}
                    onClick={() => setActiveTab('notifications')}
                  />
                  <DashboardNavItem
                    icon={<Settings className="h-5 w-5" />}
                    label="Paramètres"
                    isActive={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                  />
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'policies' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Mes polices d'assurance</h2>
                        <button className="text-[#0F3460] hover:text-[#20BDBE] font-medium text-sm flex items-center">
                          Voir tout <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {policies.map(policy => (
                        <div key={policy.id} className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center mb-2">
                                <Car className="h-5 w-5 text-[#0F3460] mr-2" />
                                <h3 className="font-semibold text-lg">{policy.vehicle}</h3>
                                <span className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                                  policy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {policy.status === 'active' ? 'Active' : 'En attente'}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-1">N° de police: {policy.id}</p>
                              <p className="text-gray-600 text-sm mb-1">Immatriculation: {policy.registration}</p>
                              <p className="text-gray-600 text-sm mb-1">
                                Période: {policy.startDate} au {policy.endDate}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Formule: <span className="font-medium text-[#0F3460]">{policy.type}</span>
                              </p>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <span className="text-xl font-semibold">{policy.premium} €</span>
                              <button className="bg-[#0F3460] hover:bg-[#0a2647] text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300">
                                Voir détails
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold">Documents disponibles</h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DocumentCard 
                          title="Attestation d'assurance" 
                          date="01/06/2023"
                          type="pdf"
                        />
                        <DocumentCard 
                          title="Conditions générales" 
                          date="01/06/2023"
                          type="pdf"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Mes documents</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DocumentCard 
                        title="Attestation d'assurance" 
                        date="01/06/2023"
                        type="pdf"
                      />
                      <DocumentCard 
                        title="Conditions générales" 
                        date="01/06/2023"
                        type="pdf"
                      />
                      <DocumentCard 
                        title="Conditions particulières" 
                        date="01/06/2023"
                        type="pdf"
                      />
                      <DocumentCard 
                        title="Facture" 
                        date="01/06/2023"
                        type="pdf"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Historique des paiements</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Référence
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Montant
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Méthode
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map(payment => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              {payment.amount} €
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Réussi
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'claims' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Mes sinistres</h2>
                  </div>
                  
                  <div className="p-6">
                    {claims.length > 0 ? (
                      <div>Claims list</div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                          <Car className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun sinistre déclaré</h3>
                        <p className="text-gray-600 mb-4">Vous n'avez pas encore déclaré de sinistre</p>
                        <button className="bg-[#0F3460] hover:bg-[#0a2647] text-white font-medium py-2 px-4 rounded-md transition duration-300">
                          Déclarer un sinistre
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Notifications</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-center py-8">
                      <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                        <Bell className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Aucune notification</h3>
                      <p className="text-gray-600">Vous n'avez pas de notifications pour le moment</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Paramètres du compte</h2>
                  </div>
                  
                  <div className="p-6">
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            defaultValue={insuranceData.subscriber.firstName || 'Jean'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            defaultValue={insuranceData.subscriber.lastName || 'Dupont'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            defaultValue={insuranceData.subscriber.email || 'jean.dupont@example.com'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            defaultValue={insuranceData.subscriber.mobile || '06 12 34 56 78'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#20BDBE] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="bg-[#0F3460] hover:bg-[#0a2647] text-white font-medium py-2 px-4 rounded-md transition duration-300">
                          Enregistrer les modifications
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DashboardNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const DashboardNavItem: React.FC<DashboardNavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition duration-200 ${
        isActive 
          ? 'bg-[#0F3460] text-white' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

interface DocumentCardProps {
  title: string;
  date: string;
  type: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, date, type }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-gray-600">Ajouté le {date}</p>
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase ${
          type === 'pdf' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {type}
        </span>
      </div>
      <button className="mt-4 text-[#0F3460] hover:text-[#20BDBE] text-sm font-medium flex items-center transition duration-200">
        <Download className="h-4 w-4 mr-1" /> Télécharger
      </button>
    </div>
  );
};

export default DashboardPage;