import React, { createContext, useContext, useState } from 'react';

// Define types
export type VehicleData = {
  fiscalPower?: string;
  duration?: number;
  genre?: string;
  periodicity?: { type: 'days' | 'months'; value: number };
  energyType?: 'diesel' | 'essence' | 'electric';
  circulationDate?: string;
  seats?: number;
  registration?: string;
  model?: string;
  brand?: string;
  sagier?: string;
};

export type SubscriberData = {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
};

export type InsuredData = {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
};

export type PolicyData = {
  name?: string;
  periodicity?: { type: 'days' | 'months'; value: number };
  duration?: number;
  policyNumber?: string;
  guarantees?: { [key: string]: number }; // Values from 1-8
};

export type InsuranceData = {
  vehicle: VehicleData;
  subscriber: SubscriberData;
  insured: InsuredData;
  policy: PolicyData;
  civilLiability?: any;
};

// Create the context
type InsuranceContextType = {
  insuranceData: InsuranceData;
  updateVehicleData: (data: Partial<VehicleData>) => void;
  updateSubscriberData: (data: Partial<SubscriberData>) => void;
  updateInsuredData: (data: Partial<InsuredData>) => void;
  updatePolicyData: (data: Partial<PolicyData>) => void;
  setCivilLiability: (data: any) => void;
  resetData: () => void;
};

const defaultInsuranceData: InsuranceData = {
  vehicle: {},
  subscriber: {},
  insured: {},
  policy: {},
};

const InsuranceContext = createContext<InsuranceContextType | undefined>(undefined);

export const InsuranceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [insuranceData, setInsuranceData] = useState<InsuranceData>(defaultInsuranceData);

  const updateVehicleData = (data: Partial<VehicleData>) => {
    setInsuranceData(prev => ({
      ...prev,
      vehicle: { ...prev.vehicle, ...data },
    }));
  };

  const updateSubscriberData = (data: Partial<SubscriberData>) => {
    setInsuranceData(prev => ({
      ...prev,
      subscriber: { ...prev.subscriber, ...data },
    }));
  };

  const updateInsuredData = (data: Partial<InsuredData>) => {
    setInsuranceData(prev => ({
      ...prev,
      insured: { ...prev.insured, ...data },
    }));
  };

  const updatePolicyData = (data: Partial<PolicyData>) => {
    setInsuranceData(prev => ({
      ...prev,
      policy: { ...prev.policy, ...data },
    }));
  };

  const setCivilLiability = (data: any) => {
    setInsuranceData(prev => ({
      ...prev,
      civilLiability: data,
    }));
  };

  const resetData = () => {
    setInsuranceData(defaultInsuranceData);
  };

  return (
    <InsuranceContext.Provider value={{ 
      insuranceData, 
      updateVehicleData, 
      updateSubscriberData, 
      updateInsuredData, 
      updatePolicyData,
      setCivilLiability,
      resetData 
    }}>
      {children}
    </InsuranceContext.Provider>
  );
};

export const useInsurance = (): InsuranceContextType => {
  const context = useContext(InsuranceContext);
  if (context === undefined) {
    throw new Error('useInsurance must be used within an InsuranceProvider');
  }
  return context;
};