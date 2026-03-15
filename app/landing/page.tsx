'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Lock, Zap, TrendingUp, Shield, Code2, CheckCircle2, AlertCircle } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function InnfluxLanding() {
  const [walletAddress, setWalletAddress] = useState('0x9cc6c5d8318C69b602b866F644628E61d98F55ed');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  const radarData = [
    { name: 'Wallet Age', value: 100 },
    { name: 'Stablecoin Hold', value: 59 },
    { name: 'Remittance Pattern', value: 98 },
    { name: 'Counterparty Div.', value: 100 },
    { name: 'DeFi Activity', value: 100 },
    { name: 'Liquidation Risk', value: 100 },
    { name: 'Transfer Velocity', value: 80 },
  ];

  const handleScanWallet = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FluxScore Gauge Component
  const FluxScoreGauge = ({ score = 893, max = 1000 }) => {
    const percentage = (score / max) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90" width="128" height="128" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="#1e293b"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-blue-400">{score}</div>
            <div className="text-xs text-gray-400">{max}</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm font-semibold text-green-400">EXCELLENT</div>
          <div className="text-xs text-gray-400">Risk: LOW</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white font-sans">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Innflux
          </h1>
          <p className="text-2xl sm:text-3xl font-light text-blue-300 mb-6">
            Credit Without Borders
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            The composable credit layer merging DeFi liquidity with emerging market underwriting. Instant verification. Zero compromise on privacy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollToSection('demo')}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Check Your FluxScore
            </button>
            <button
              onClick={() => scrollToSection('institutions')}
              className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-950 font-semibold rounded-lg transition-all duration-200"
            >
              For Institutions
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <ChevronDown size={32} className="animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-8 rounded-xl bg-gradient-to-b from-blue-900/20 to-slate-900/20 border border-blue-800/30 backdrop-blur-sm hover:border-blue-600/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3">Connect Your Wallet</h3>
              <p className="text-gray-400">
                Link your Ethereum or Polygon wallet to begin the verification process. Your on-chain history becomes the foundation of your FluxScore.
              </p>
              <div className="mt-4 text-sm text-blue-400 flex items-center gap-2">
                <Zap size={16} />
                Instant connection
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-xl bg-gradient-to-b from-green-900/20 to-slate-900/20 border border-green-800/30 backdrop-blur-sm hover:border-green-600/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3">Link Banking Data</h3>
              <p className="text-gray-400">
                Connect your bank account via Mono, Okra, Stitch, or Finverse. Your traditional financial history is analyzed in a privacy-preserving enclave.
              </p>
              <div className="mt-4 text-sm text-green-400 flex items-center gap-2">
                <Lock size={16} />
                TEE encrypted
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-xl bg-gradient-to-b from-purple-900/20 to-slate-900/20 border border-purple-800/30 backdrop-blur-sm hover:border-purple-600/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3">Get Your FluxScore</h3>
              <p className="text-gray-400">
                Receive a composite credit score merging blockchain analytics with underwriting intelligence. Instant approval decisions.
              </p>
              <div className="mt-4 text-sm text-purple-400 flex items-center gap-2">
                <TrendingUp size={16} />
                Real-time calculation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live FluxScore Demo */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Your FluxScore</h2>
          <p className="text-center text-gray-400 mb-16">Enter a wallet address to see your credit potential instantly</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="flex flex-col justify-center">
              <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
                <label className="block text-sm font-semibold text-gray-300 mb-3">Wallet Address</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 mb-6"
                />
                <button
                  onClick={handleScanWallet}
                  disabled={isScanning}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  {isScanning ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Scanning...
                    </span>
                  ) : (
                    'Scan Wallet'
                  )}
                </button>

                {!scanComplete && !isScanning && (
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Demo wallet pre-filled • Click to analyze
                  </p>
                )}
              </div>

              {scanComplete && (
                <div className="mt-8 p-6 rounded-lg bg-green-500/10 border border-green-500/30 animate-fade-in">
                  <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle2 size={20} />
                    <span className="font-semibold">Scan complete</span>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div>
              {!scanComplete && !isScanning && (
                <div className="h-full flex items-center justify-center p-8 rounded-xl bg-gradient-to-b from-slate-800/30 to-slate-900/30 border border-slate-700/30">
                  <p className="text-center text-gray-400">
                    Enter a wallet address and click "Scan Wallet" to view FluxScore results
                  </p>
                </div>
              )}

              {isScanning && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing on-chain and off-chain data...</p>
                  </div>
                </div>
              )}

              {scanComplete && (
                <div className="space-y-8 animate-fade-in">
                  {/* Score Gauge */}
                  <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm flex justify-center">
                    <FluxScoreGauge score={893} max={1000} />
                  </div>

                  {/* Risk Level & Recommendation */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                      <p className="text-xs text-gray-400 mb-1">Risk Level</p>
                      <p className="text-lg font-bold text-green-400">LOW</p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-xs text-gray-400 mb-1">Credit Limit</p>
                      <p className="text-lg font-bold text-blue-400">$438</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <p className="text-xs text-amber-400 font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      RECOMMENDATION
                    </p>
                    <p className="text-sm font-semibold text-amber-300">APPROVE — $438 credit line available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Radar Chart & Portfolio */}
          {scanComplete && (
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Radar Chart */}
              <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6">Score Components</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                    <PolarRadiusAxis stroke="#475569" tick={{ fill: '#94a3b8' }} />
                    <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Portfolio Summary */}
              <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6">Wallet Overview</h3>

                <div className="mb-8">
                  <p className="text-sm font-semibold text-gray-400 mb-3">Token Portfolio</p>
                  <div className="space-y-2">
                    {[
                      { token: 'MON', balance: '12,450', value: '$48.2K' },
                      { token: 'INX', balance: '8,920', value: '$35.1K' },
                      { token: 'USDC', balance: '128,540', value: '$128.5K' },
                      { token: 'ZRO', balance: '342', value: '$12.4K' },
                    ].map((asset) => (
                      <div key={asset.token} className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                        <span className="text-sm font-medium">{asset.token}</span>
                        <div className="text-right">
                          <div className="text-sm text-blue-400">{asset.balance}</div>
                          <div className="text-xs text-gray-500">{asset.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 mb-3">DeFi Positions</p>
                  <div className="space-y-2">
                    {[
                      { protocol: 'Aave V3', exposure: 'USDC deposit' },
                      { protocol: 'Ethena', exposure: 'sUSDe staking' },
                      { protocol: 'Morpho', exposure: 'DAI lending' },
                      { protocol: 'iUSD Vault', exposure: 'iUSD position' },
                    ].map((position) => (
                      <div key={position.protocol} className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                        <span className="text-sm font-medium">{position.protocol}</span>
                        <span className="text-xs text-green-400">{position.exposure}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Open Banking Integration */}
      <section id="banking" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Blended Scoring</h2>
          <p className="text-center text-gray-400 mb-16">Link your bank account to unlock higher credit limits through traditional underwriting</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Providers */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Supported Providers</h3>

              <div className="space-y-6">
                {[
                  { region: 'Nigeria', providers: ['Mono', 'Okra'] },
                  { region: 'South Africa', providers: ['Stitch'] },
                  { region: 'Kenya', providers: ['Finverse'] },
                  { region: 'Pan-Africa', providers: ['Plaid (coming soon)'] },
                ].map((group) => (
                  <div key={group.region}>
                    <p className="text-sm font-semibold text-blue-400 mb-2">{group.region}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.providers.map((provider) => (
                        <div
                          key={provider}
                          className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-gray-300"
                        >
                          {provider}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
                Connect Bank Account
              </button>
            </div>

            {/* Limit Comparison */}
            <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Credit Limit Impact</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-400">On-chain Only</p>
                    <p className="text-lg font-bold text-blue-400">$438</p>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-400">With Banking Data</p>
                    <p className="text-lg font-bold text-green-400">$1,094+</p>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-green-400">2.5x increase</span> in credit capacity by adding traditional financial history to your FluxScore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEE Privacy Section */}
      <section id="privacy" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Privacy by Architecture</h2>
          <p className="text-center text-gray-400 mb-16">Your data is protected by hardware-level encryption</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Flow Diagram */}
            <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="space-y-4">
                {/* User Data */}
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <p className="font-semibold">Your Data</p>
                      <p className="text-sm text-gray-400">Bank + Wallet credentials</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="text-blue-400">↓</div>
                </div>

                {/* TEE Enclave */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50">
                  <div className="flex items-center gap-3">
                    <Lock className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="font-semibold">TEE Enclave</p>
                      <p className="text-sm text-gray-400">Isolated secure computation</p>
                    </div>
                  </div>
                </div>

                {/* Processing */}
                <div className="p-3 rounded bg-slate-900/50 border border-slate-700/50 text-center text-sm">
                  <p className="text-gray-400">
                    PII encrypted with <span className="text-cyan-400 font-mono text-xs">AES-256</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Privacy Pointer created with <span className="text-cyan-400 font-mono text-xs">HMAC-SHA256</span>
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="text-green-400">↓</div>
                </div>

                {/* Output */}
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <p className="font-semibold">Privacy Pointer</p>
                      <p className="text-sm text-gray-400">Score + anonymous pointer only</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="text-green-400">↓</div>
                </div>

                {/* Lender */}
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="font-semibold">Loan Vault</p>
                      <p className="text-sm text-gray-400">Never sees your identity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Details */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Privacy Guarantees</h3>

              <div className="space-y-4">
                {[
                  {
                    icon: Lock,
                    title: 'End-to-End Encryption',
                    description: 'AES-256 encryption on all PII within the TEE. Decryption happens only within the isolated enclave.',
                    tech: 'AES-256',
                  },
                  {
                    icon: Shield,
                    title: 'Hardware-Backed Isolation',
                    description: 'Data processing happens in Intel SGX or AWS Nitro Enclaves. No cloud provider can access plaintext data.',
                    tech: 'SGX/Nitro',
                  },
                  {
                    icon: Zap,
                    title: 'Privacy Pointers',
                    description: 'HMAC-SHA256 pointers allow verification without exposing identity. Lenders verify creditworthiness anonymously.',
                    tech: 'HMAC-SHA256',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'No Data Retention',
                    description: 'Bank credentials and PII are not stored. Only an encrypted privacy pointer and credit score exit the enclave.',
                    tech: 'Zero-Knowledge',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                          <p className="text-xs text-cyan-400 mt-2 font-mono">{item.tech}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Institutions */}
      <section id="institutions" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Plug Into FluxScore</h2>
          <p className="text-center text-gray-400 mb-16">Integrate emerging market credit scoring into your lending platform</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* API Endpoints */}
            <div className="p-8 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm font-mono text-sm">
              <h3 className="text-xl font-bold mb-6 font-sans">REST API</h3>

              <div className="space-y-4">
                {[
                  { method: 'POST', endpoint: '/underwrite', desc: 'Score single applicant' },
                  { method: 'POST', endpoint: '/batch-underwrite', desc: 'Score multiple applicants' },
                  { method: 'GET', endpoint: '/score/{case_id}', desc: 'Retrieve existing score' },
                  { method: 'POST', endpoint: '/verify-pointer', desc: 'Verify privacy pointer' },
                ].map((api, idx) => (
                  <div key={idx} className="p-3 rounded bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        api.method === 'POST' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                      }`}>
                        {api.method}
                      </span>
                      <span className="text-gray-300">{api.endpoint}</span>
                    </div>
                    <p className="text-xs text-gray-500">{api.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded bg-slate-900/50 border border-slate-700/50">
                <p className="text-xs text-gray-400 mb-2">Example Request</p>
                <pre className="text-xs overflow-x-auto text-cyan-300">
{`curl -X POST https://api.innflux.io/underwrite \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{
    "wallet": "0x...",
    "banking_pointer": "ptr_...",
    "amount_requested": 500
  }'`}
                </pre>
              </div>
            </div>

            {/* Stats & Performance */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Performance Metrics</h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Accuracy', value: '91.25%', icon: CheckCircle2, color: 'green' },
                  { label: 'Default Detection', value: '100%', icon: Shield, color: 'blue' },
                  { label: 'Approval Rate', value: '72.5%', icon: TrendingUp, color: 'purple' },
                  { label: 'Processing Time', value: '<2s', icon: Zap, color: 'amber' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  const bgColor = {
                    green: 'bg-green-500/10 border-green-500/30',
                    blue: 'bg-blue-500/10 border-blue-500/30',
                    purple: 'bg-purple-500/10 border-purple-500/30',
                    amber: 'bg-amber-500/10 border-amber-500/30',
                  }[stat.color as string];
                  const textColor = {
                    green: 'text-green-400',
                    blue: 'text-blue-400',
                    purple: 'text-purple-400',
                    amber: 'text-amber-400',
                  }[stat.color as string];

                  return (
                    <div key={idx} className={`p-4 rounded-lg ${bgColor} border`}>
                      <Icon className={`w-5 h-5 ${textColor} mb-2`} />
                      <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${textColor}`}>{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-sm font-semibold mb-2">Validation</p>
                <p className="text-xs text-gray-400">
                  80 benchmark cases tested against Mono creditworthiness profiles. Consistent outperformance on emerging market risk assessment.
                </p>
              </div>

              <button className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
                View Full Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-2xl font-bold mb-2">Innflux</p>
              <p className="text-gray-400 text-sm">Built for the unbanked.<br/>Powered by DeFi.</p>
            </div>
            <div>
              <p className="font-semibold mb-3">Resources</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Company</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2026 Innflux. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              {['Twitter', 'Discord', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-500 hover:text-blue-400 transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
