/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import BrandInput from "./components/BrandInput";
import LoadingScreen from "./components/LoadingScreen";
import BrandBibleDashboard from "./components/BrandBibleDashboard";
import { BrandBible } from "./types";
import { generateBrandBible, generateLogoImage } from "./services/geminiService";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [brandData, setBrandData] = useState<BrandBible | null>(null);
  const [logoUrls, setLogoUrls] = useState<{ primary?: string; secondary?: string; mark?: string }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBrand = async (mission: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Generate the Brand Bible structure
      const data = await generateBrandBible(mission);
      setBrandData(data);

      // Now we have the structural data, we can move to the dashboard 
      // and let the logos generate "in the background" or async
      setLoading(false);

      // 2. Generate Logos asynchronously
      generateLogos(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while defining your identity. Please try again.");
      setLoading(false);
    }
  };

  const generateLogos = async (data: BrandBible) => {
    try {
      const primaryUrl = await generateLogoImage(data.logoConcepts.primary.description, data);
      setLogoUrls(prev => ({ ...prev, primary: primaryUrl }));

      const secondaryUrl = await generateLogoImage(data.logoConcepts.secondary.description, data);
      setLogoUrls(prev => ({ ...prev, secondary: secondaryUrl }));

      const markUrl = await generateLogoImage(data.logoConcepts.mark.description, data);
      setLogoUrls(prev => ({ ...prev, mark: markUrl }));
    } catch (err) {
      console.error("Logo generation failed", err);
    }
  };

  const handleReset = () => {
    setBrandData(null);
    setLogoUrls({});
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (brandData) {
    return (
      <BrandBibleDashboard 
        data={brandData} 
        onReset={handleReset} 
        logoUrls={logoUrls}
      />
    );
  }

  return (
    <div>
      <BrandInput onSubmit={handleGenerateBrand} isLoading={loading} />
      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-xl font-bold animate-bounce">
          {error}
        </div>
      )}
    </div>
  );
}
