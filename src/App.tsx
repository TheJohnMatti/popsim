// App layout for PopSim - excluding the core simulation component for now

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SimulationDashboard from "./components/simulation/SimulationDashboard";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  return (
    <Router>
      <div className="flex flex-row h-screen w-screen overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header />

          {/* Content */}
          <main className="flex flex-1 overflow-hidden">
            {/* Simulation Area Placeholder */}
            <div className="flex-1 bg-white p-4">
              {/* Simulation component goes here */}
              <Routes>
                <Route path="/" element={<SimulationDashboard />} />
                {/* Additional routes can go here */}
              </Routes>
            </div>

            {/* Settings/Control Panel */}
            <SettingsPanel />
          </main>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Router>
  );
}
