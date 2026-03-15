'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Wallet, Landmark as Bank, ArrowRight, Check, AlertCircle, TrendingUp,
  Lock, Eye, EyeOff, Zap, Shield, DollarSign, Clock, Target
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const InnfluxApp = () => {
  const [screen, setScreen] = useState('landing');
  const [selectedOption, setSelectedOption] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fluxScore, setFluxScore] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [selectedTenure, setSelectedTenure] = useState(6);
  const [privacyPointer, setPrivacyPointer] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const nigerianBanks = [
    'Guaranty Trust Bank (GTBank)',
    'Access Bank',
    'Zenith Bank',
    'United Bank for Africa (UBA)',
    'First Bank',
    'Sterling Bank',
    'Fidelity Bank',
    'Stanbic IBTC'
  ];

  // Demo data for specific wallet
  const demoWalletData = {
    address: '0x9cc6c5d8318C69b602b866F644628E61d98F55ed',
    fluxScore: 893,
    components: {
      walletAge: 100,
      stablecoinHolding: 59,
      remittancePattern: 98,
      counterpartyDiversity: 100,
      defiActivity: 100,
      liquidationRisk: 100,
      transferVelocity: 80
    },
    tokens: [
      { symbol: 'MON', amount: 264.60 },
      { symbol: 'INX', amount: 138.48 },
      { symbol: 'USDC', amount: 109.33 },
      { symbol: 'ZRO', amount: 154.40 }
    ],
    defi: ['Aave V3', 'Ethena', 'Morpho', 'iUSD Vault'],
    creditOffer: 438,
    blendedOffer: 1094,
    interest: 4.2
  };

  // Demo data for banks
  const demoBankData = {
    salary: 450000,
    salaryConfidence: 85,
    inflow: 520000,
    outflow: 310000,
    overdrafts: 0,
    negativeDays: 0,
    volatility: 0.23,
    tradfiScore: 780,
    fluxScore: 850,
    blendedScore: 850,
    interest: 5.8
  };

  const generateRandomScore = () => {
    return Math.floor(Math.random() * 400) + 400;
  };

  const handleWalletScan = async () => {
    setIsLoading(true);
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2500));
    clearInterval(interval);
    setLoadingProgress(100);

    let scoreData;
    if (walletAddress.toLowerCase() === demoWalletData.address.toLowerCase()) {
      scoreData = {
        source: 'wallet',
        score: demoWalletData.fluxScore,
        components: {
          'Wallet Maturity': demoWalletData.components.walletAge,
          'Stablecoin Holding': demoWalletData.components.stablecoinHolding,
          'Remittance Pattern': demoWalletData.components.remittancePattern,
          'Counterparty Diversity': demoWalletData.components.counterpartyDiversity,
          'DeFi Activity': demoWalletData.components.defiActivity,
          'Liquidation Risk': demoWalletData.components.liquidationRisk,
          'Transfer Velocity': demoWalletData.components.transferVelocity
        },
        offer: demoWalletData.creditOffer,
        tokens: demoWalletData.tokens,
        defi: demoWalletData.defi,
        interest: demoWalletData.interest
      };
    } else {
      scoreData = {
        source: 'wallet',
        score: generateRandomScore(),
        components: {
          'Wallet Maturity': Math.floor(Math.random() * 100),
          'Stablecoin Holding': Math.floor(Math.random() * 100),
          'Remittance Pattern': Math.floor(Math.random() * 100),
          'Counterparty Diversity': Math.floor(Math.random() * 100),
          'DeFi Activity': Math.floor(Math.random() * 100),
          'Liquidation Risk': Math.floor(Math.random() * 100),
          'Transfer Velocity': Math.floor(Math.random() * 100)
        },
        offer: Math.floor(Math.random() * 500) + 200,
        tokens: [],
        defi: [],
        interest: 3.5 + Math.random() * 3
      };
    }

    setScoreData(scoreData);
    setFluxScore(scoreData.score);
    setIsLoading(false);
    setScreen('score-results');
  };

  const handleBankConnect = async () => {
    setIsLoading(true);
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2000));
    clearInterval(interval);
    setLoadingProgress(100);

    const blendedScore = Math.round((demoBankData.blendedScore + (scoreData?.score || 0)) / 2);

    setScoreData(prev => ({
      ...prev,
      source: 'blended',
      tradfiScore: demoBankData.tradfiScore,
      blendedScore: blendedScore,
      bankData: demoBankData,
      blendedOffer: demoWalletData.blendedOffer
    }));

    setFluxScore(blendedScore);
    setIsLoading(false);
    setScreen('score-results');
  };

  // Render Landing Screen
  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Innflux
            </h1>
            <p className="text-xl text-gray-300">Verify your creditworthiness across DeFi and TradFi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wallet Option */}
            <div
              onClick={() => { setScreen('wallet-scan'); setSelectedOption('wallet'); }}
              className="p-8 rounded-xl bg-gradient-to-b from-blue-900/20 to-slate-900/20 border border-blue-800/30 cursor-pointer hover:border-blue-600/50 transition-all transform hover:scale-105"
            >
              <Wallet className="w-12 h-12 text-blue-400 mb-4" />
              <h2 className="text-2xl font-bold mb-3">Connect Wallet</h2>
              <p className="text-gray-400 mb-4">
                Analyze your on-chain transaction history, DeFi interactions, and stablecoin holdings.
              </p>
              <div className="flex items-center text-blue-400">
                <span className="text-sm font-semibold">Get on-chain FluxScore</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>

            {/* Bank Option */}
            <div
              onClick={() => { setScreen('bank-selection'); setSelectedOption('bank'); }}
              className="p-8 rounded-xl bg-gradient-to-b from-green-900/20 to-slate-900/20 border border-green-800/30 cursor-pointer hover:border-green-600/50 transition-all transform hover:scale-105"
            >
              <Bank className="w-12 h-12 text-green-400 mb-4" />
              <h2 className="text-2xl font-bold mb-3">Link Bank Account</h2>
              <p className="text-gray-400 mb-4">
                Connect your Nigerian bank account via Mono to unlock higher credit limits through TradFi scoring.
              </p>
              <div className="flex items-center text-green-400">
                <span className="text-sm font-semibold">Get blended FluxScore</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Wallet Scan Screen
  if (screen === 'wallet-scan') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <button
            onClick={() => setScreen('landing')}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-blue-400"
          >
            <ArrowRight size={20} className="rotate-180" />
            Back
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-gray-400">Enter your Ethereum or Polygon wallet address</p>
          </div>

          <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 mb-6"
            />

            <button
              onClick={handleWalletScan}
              disabled={isLoading || !walletAddress}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-all"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Scanning ({Math.round(loadingProgress)}%)
                </span>
              ) : (
                'Scan Wallet'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Bank Selection Screen
  if (screen === 'bank-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <button
            onClick={() => setScreen('landing')}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-blue-400"
          >
            <ArrowRight size={20} className="rotate-180" />
            Back
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Select Your Bank</h1>
            <p className="text-gray-400">Choose your Nigerian bank to authenticate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nigerianBanks.map((bank) => (
              <button
                key={bank}
                onClick={() => { setSelectedBank(bank); setIsLoading(true); handleBankConnect(); }}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-green-600/50 text-left transition-all"
              >
                <p className="font-semibold">{bank}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Score Results Screen
  if (screen === 'score-results' && scoreData) {
    const creditRisk = scoreData.score < 400 ? 'CRITICAL' : scoreData.score < 600 ? 'HIGH' : scoreData.score < 800 ? 'MEDIUM' : 'LOW';
    const creditColor = creditRisk === 'CRITICAL' ? 'red' : creditRisk === 'HIGH' ? 'orange' : creditRisk === 'MEDIUM' ? 'yellow' : 'green';

    const radarData = Object.entries(scoreData.components || {}).map(([key, value]) => ({
      name: key.split(' ').slice(0, 2).join(' '),
      value: value
    }));

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <button
            onClick={() => setScreen('landing')}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-blue-400"
          >
            <ArrowRight size={20} className="rotate-180" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Score Display */}
            <div className="space-y-6">
              <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50">
                <p className="text-gray-400 mb-2">Your FluxScore</p>
                <p className="text-5xl font-bold text-blue-400 mb-2">{scoreData.score}</p>
                <p className="text-gray-400 text-sm">/1000</p>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50">
                <p className="text-gray-400 mb-4">Risk Assessment</p>
                <div className={`p-4 rounded-lg bg-${creditColor}-500/10 border border-${creditColor}-500/30`}>
                  <p className={`text-2xl font-bold text-${creditColor}-400`}>{creditRisk}</p>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50">
                <p className="text-gray-400 mb-4">Credit Offer</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Available Amount</p>
                    <p className="text-3xl font-bold text-green-400">${scoreData.offer || scoreData.blendedOffer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Interest Rate</p>
                    <p className="text-xl text-blue-400">{scoreData.interest?.toFixed(2)}% APY</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Components Chart */}
            <div>
              <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 mb-6">
                <h3 className="text-xl font-bold mb-6">Score Breakdown</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                    <PolarRadiusAxis stroke="#475569" />
                    <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {scoreData.bankData && (
                <div className="p-8 rounded-xl bg-gradient-to-b from-green-900/20 to-slate-900/20 border border-green-800/30">
                  <h3 className="text-xl font-bold mb-4">Banking Profile</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Salary</span>
                      <span className="text-green-400">₦{scoreData.bankData.salary?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Inflow</span>
                      <span className="text-green-400">₦{scoreData.bankData.inflow?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Overdraft Events</span>
                      <span className={scoreData.bankData.overdrafts === 0 ? 'text-green-400' : 'text-red-400'}>{scoreData.bankData.overdrafts}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setScreen('loan-offer')}
            className="mt-12 w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
          >
            Continue to Loan Terms
          </button>
        </div>
      </div>
    );
  }

  // Render Loan Offer Screen
  if (screen === 'loan-offer' && scoreData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Loan Terms</h1>
            <p className="text-gray-400">Customize your loan offer</p>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50">
              <label className="block text-sm font-semibold text-gray-300 mb-4">Loan Amount</label>
              <input
                type="number"
                defaultValue={scoreData.offer || scoreData.blendedOffer}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white mb-4"
              />

              <label className="block text-sm font-semibold text-gray-300 mb-4">Loan Tenure (Months)</label>
              <select
                value={selectedTenure}
                onChange={(e) => setSelectedTenure(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white"
              >
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
                <option value={24}>24 months</option>
              </select>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-b from-green-900/20 to-slate-900/20 border border-green-800/30">
              <h3 className="text-xl font-bold mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Loan Amount</span>
                  <span className="text-green-400 font-bold">${scoreData.offer || scoreData.blendedOffer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interest Rate</span>
                  <span className="text-green-400 font-bold">{scoreData.interest?.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tenure</span>
                  <span className="text-green-400 font-bold">{selectedTenure} months</span>
                </div>
                <div className="border-t border-green-600/30 pt-3 flex justify-between">
                  <span className="text-gray-300 font-semibold">Monthly Payment</span>
                  <span className="text-green-400 font-bold">${(((scoreData.offer || scoreData.blendedOffer) / selectedTenure) * (1 + (scoreData.interest || 4.2) / 100 / 12)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setScreen('payment')}
              className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all"
            >
              Accept & Continue to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Payment Screen
  if (screen === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Loan Approved!</h1>
            <p className="text-gray-400">Your funds will be disbursed within 24 hours</p>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-xl bg-gradient-to-b from-green-900/20 to-slate-900/20 border border-green-800/30">
              <h3 className="text-xl font-bold mb-4">Disbursement Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Recipient Address</span>
                  <code className="text-cyan-400 text-sm">{privacyPointer || '0xPRIVACY_POINTER_****'}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-green-400 font-bold">${scoreData?.offer || scoreData?.blendedOffer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-bold">Processing</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setScreen('landing'); setScoreData(null); setFluxScore(null); setWalletAddress(''); }}
              className="w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InnfluxApp;
