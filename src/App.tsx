import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import InsuranceFormPage from './pages/InsuranceFormPage';
import QuotePage from './pages/QuotePage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import { InsuranceProvider } from './context/InsuranceContext';

function App() {
  return (
    <InsuranceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/insurance-form" element={<InsuranceFormPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </InsuranceProvider>
  );
}

export default App;