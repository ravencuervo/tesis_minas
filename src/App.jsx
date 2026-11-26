import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OverviewModule from './components/OverviewModule';
import FormulasModule from './components/FormulasModule';
import SimulationModule from './components/SimulationModule';
import DataModule from './components/DataModule';
import FiguresModule from './components/FiguresModule';
import StatisticsModule from './components/StatisticsModule';
import DefenseSimulatorModule from './components/DefenseSimulatorModule';
import ResourcesModule from './components/ResourcesModule';
import DataTreatmentModule from './components/DataTreatmentModule';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [defenseMode, setDefenseMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        defenseMode={defenseMode} 
        setDefenseMode={setDefenseMode} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewModule setActiveTab={setActiveTab} defenseMode={defenseMode} />
        )}
        {activeTab === 'formulas' && (
          <FormulasModule defenseMode={defenseMode} />
        )}
        {activeTab === 'simulation' && (
          <SimulationModule defenseMode={defenseMode} />
        )}
        {activeTab === 'data' && (
          <DataModule defenseMode={defenseMode} />
        )}
        {activeTab === 'figures' && (
          <FiguresModule defenseMode={defenseMode} />
        )}
        {activeTab === 'statistics' && (
          <StatisticsModule defenseMode={defenseMode} />
        )}
        {activeTab === 'defense' && (
          <DefenseSimulatorModule />
        )}
        {activeTab === 'resources' && (
          <ResourcesModule />
        )}
        {activeTab === 'datatreatment' && (
          <DataTreatmentModule defenseMode={defenseMode} />
        )}
      </main>

      <Footer />
    </div>
  );
}
