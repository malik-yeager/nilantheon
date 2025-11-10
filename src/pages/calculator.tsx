'use client';

import { motion } from 'framer-motion';
import { Leaf, Calculator, TrendingUp, Award } from 'lucide-react';
import { useState } from 'react';

export const CarbonCalculatorSection = () => {
  const [emissions, setEmissions] = useState("");
  const [calculatedEmissions, setCalculatedEmissions] = useState("");
  const [savings, setSavings] = useState<number | null>(null);
  const [equivalents, setEquivalents] = useState<any>(null);

  const RATE_PER_TON = 7.1;

  const calculateEquivalents = (tons: number) => ({
    trees: Math.round(tons * 16.5),
    cars: Math.round(tons * 0.22),
    homes: Math.round(tons * 0.19),
    flights: Math.round(tons * 0.125),
  });

  const handleCalculate = () => {
    const num = parseFloat(emissions);
    if (!isNaN(num) && num > 0 && num <= 1000000000) {
      const calculatedSavings = num * RATE_PER_TON;
      setCalculatedEmissions(num.toLocaleString());
      setSavings(calculatedSavings);
      setEquivalents(calculateEquivalents(num));
    } else {
      setSavings(null);
      setEquivalents(null);
      setCalculatedEmissions("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-sky-500 text-transparent bg-clip-text">
          Carbon Impact Calculator
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate your environmental impact and potential carbon credit value.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/60"
      >
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative md:flex">
            {/* Input Section */}
            <div className="p-8 md:p-10 md:w-1/2 bg-gradient-to-br from-teal-50 to-emerald-50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Carbon Calculator</h3>
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  CO₂ Emissions Reduced (tons)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emissions}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d*\.?\d*$/.test(value)) {
                        const num = parseFloat(value);
                        if (value === "" || (!isNaN(num) && num <= 1000000000)) {
                          setEmissions(value);
                        }
                      }
                    }}
                    placeholder="Enter amount (e.g., 25.5)"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-gray-900 shadow-sm"
                  />
                  <Calculator className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Rate: ${RATE_PER_TON}/ton CO₂ for carbon credits
                </p>
              </div>

              <button
                onClick={handleCalculate}
                disabled={
                  !emissions ||
                  isNaN(parseFloat(emissions)) ||
                  parseFloat(emissions) <= 0 ||
                  parseFloat(emissions) > 1000000000
                }
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate Impact
              </button>
            </div>

            {/* Results Section */}
            <div className="p-8 md:p-10 md:w-1/2 bg-white">
              {savings !== null ? (
                <div className="h-full flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Your Impact</h3>

                  <div className="flex-1 space-y-6">
                    <div className="bg-emerald-50 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Carbon Credit Value</h4>
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">
                        ${savings.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        From {calculatedEmissions} tons CO₂ reduced
                      </p>
                    </div>

                    {/* Display Equivalents */}
                    {equivalents && (
                      <div className="bg-blue-50 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-700">Environmental Impact</h4>
                          <Leaf className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <p>
                            <span className="font-semibold">{equivalents.trees}</span> trees planted
                          </p>
                          <p>
                            <span className="font-semibold">{equivalents.cars}</span> cars off the road
                          </p>
                          <p>
                            <span className="font-semibold">{equivalents.homes}</span> homes powered
                          </p>
                          <p>
                            <span className="font-semibold">{equivalents.flights}</span> flights offset
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Award className="w-12 h-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Your Impact Awaits</h3>
                  <p className="text-gray-400 max-w-xs">
                    Enter your CO₂ emissions data to see your potential impact
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
    </div>
  );
};