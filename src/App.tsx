import React, { useState } from 'react';
import {
  Search,
  Filter,
  BarChart2,
  TrendingUp,
  AlertCircle,
  Clock,
  Briefcase,
  Zap,
  CheckCircle,
  FileText,
  ChevronDown,
  X,
  Plus,
  Shield,
  Activity,
  Award,
  Loader2,
  Mail
} from 'lucide-react';

const industryOptions = [
  "Oil & Gas", "Power & Energy", "Manufacturing", "Food Processing",
  "Pharmaceutical", "Chemical", "Mining", "Infrastructure",
  "Automotive", "Heavy Engineering"
];

const productOptions = [
  "Valves", "Pumps", "Piping", "Instrumentation",
  "Electrical Equipment", "Fabrication", "Machined Components",
  "Structural Steel", "Industrial Machinery", "Automation Systems"
];

const marketOptions = [
  "India", "Middle East", "North America", "Europe", "Africa", "South East Asia", "Australia"
];

const tenderSources = [
  "GeM", "CPPP", "ONGC", "NTPC", "BHEL",
  "Indian Railways", "State Tenders", "Private RFQs"
];

const valueOptions = [
  "₹5 Lakh", "₹10 Lakh", "₹50 Lakh", "₹1 Crore", "₹5 Crore"
];

const opportunityTypes = [
  "Government Tenders", "Private RFQs", "Vendor Registration",
  "Procurement Notices", "Supply Contracts", "Engineering Projects"
];

export default function App() {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [companies, setCompanies] = useState<string[]>([]);
  const [companyInput, setCompanyInput] = useState('');

  // Form State
  const [industry, setIndustry] = useState('');
  const [product, setProduct] = useState('');
  const [market, setMarket] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minValue, setMinValue] = useState('');

  const handleAddCompany = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && companyInput.trim() !== '') {
      e.preventDefault();
      if (!companies.includes(companyInput.trim())) {
        setCompanies([...companies, companyInput.trim()]);
      }
      setCompanyInput('');
    }
  };

  const removeCompany = (companyToRemove: string) => {
    setCompanies(companies.filter(c => c !== companyToRemove));
  };

  const toggleSource = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setReportGenerated(false);

    try {
      const response = await fetch('https://n8n.ianman.com/webhook/market-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry,
          product,
          market,
          minValue,
          selectedSources,
          selectedTypes,
          companies
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setReportData(data);
      setReportGenerated(true);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch report from webhook.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* HEADER */}
      <header className="w-full bg-white border-b border-slate-200 z-20 shadow-sm shrink-0">
        <div className="w-full px-8 py-6 flex items-center justify-between">
          <a href="https://www.essnps.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <img 
              src="https://www.essnps.com/wp-content/uploads/2025/07/ESSNPS%C2%AE.svg" 
              alt="ESSNPS Logo" 
              style={{ width: '174.97px', height: '44px', objectFit: 'contain' }} 
            />
          </a>
          <a href="mailto:rfq@essnps.com" className="text-slate-700 font-semibold hover:text-indigo-600 flex items-center gap-2 transition-colors">
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline">rfq@essnps.com</span>
          </a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* LEFT SIDE: INPUT PANEL */}
        <div className="w-full lg:w-1/2 h-full bg-white border-r border-slate-200 flex flex-col shadow-sm z-10 overflow-y-auto">
        <div className="p-8 lg:p-12 flex-1">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3 flex items-center gap-3">
              <Filter className="w-8 h-8 text-indigo-600" />
              Market Intelligence Filters
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Monitor procurement opportunities, RFQs, tenders, supplier requirements, competitor activities, and industry developments across global markets.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-8">
            {/* Industry Sector & Product Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Industry Sector</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="" disabled>Select Industry</option>
                    {industryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Product / Equipment Category</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  >
                    <option value="" disabled>Select Category</option>
                    {productOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Target Market & Minimum Project Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Target Region</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                  >
                    <option value="" disabled>Select Region</option>
                    {marketOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Minimum Project Value</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                  >
                    <option value="" disabled>Select Value</option>
                    {valueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Opportunity Sources */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Opportunity Sources</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tenderSources.map(source => {
                  const isSelected = selectedSources.includes(source);
                  return (
                    <button
                      type="button"
                      key={source}
                      onClick={() => toggleSource(source)}
                      className={`flex items-center justify-center p-3 rounded-xl border text-sm font-medium transition-all ${isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                    >
                      {source}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Opportunity Type */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Opportunity Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {opportunityTypes.map(type => {
                  const isSelected = selectedTypes.includes(type);
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`flex items-center justify-center p-3 rounded-xl border text-sm font-medium transition-all ${isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Companies To Monitor */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Companies To Monitor (Competitors / Buyers)</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {companies.map(company => (
                  <span key={company} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-700">
                    {company}
                    <button
                      type="button"
                      onClick={() => removeCompany(company)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter company names (e.g., L&T, Siemens, ABB)..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  onKeyDown={handleAddCompany}
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <BarChart2 className="w-6 h-6" />
                    Generate Market Intelligence Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: OUTPUT PANEL */}
      <div className="w-full lg:w-1/2 h-full bg-slate-50 flex flex-col overflow-y-auto relative">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full">
            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Analyzing Market Data...</h2>
            <p className="text-slate-500">Please wait while the AI agent gathers intelligence from specified sources.</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full">
            <div className="w-24 h-24 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-center mb-6 text-red-500">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Generation Failed</h2>
            <p className="text-red-500 max-w-sm mb-4">{error}</p>
            <p className="text-sm text-slate-500">Please ensure the n8n webhook is active and listening for test events.</p>
          </div>
        ) : !reportGenerated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">No Report Generated</h2>
            <p className="text-slate-500 max-w-sm">
              Configure filters and generate a market intelligence report to uncover valuable insights and opportunities.
            </p>
          </div>
        ) : (
          <div className="p-8 lg:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-24">

            {/* Dynamic data mapping logic */}
            {(() => {
              const score = reportData?.opportunityScore || 87;
              const priority = reportData?.priority || "High Priority";
              const opportunities = reportData?.opportunities || [
                { title: "ONGC Valve Procurement", value: "₹1.2 Crore", priority: "High", color: "text-red-600 bg-red-50 border-red-100" },
                { title: "NTPC Instrumentation Supply", value: "₹75 Lakh", priority: "Medium", color: "text-amber-600 bg-amber-50 border-amber-100" },
                { title: "BHEL Pump Supply", value: "₹2.4 Crore", priority: "High", color: "text-red-600 bg-red-50 border-red-100" }
              ];
              const competitorActivity = reportData?.competitorActivity || [
                "Siemens awarded automation contract",
                "ABB launched industrial solution",
                "L&T secured infrastructure project"
              ];
              const industryNews = reportData?.industryNews || [
                "New power infrastructure budget announced",
                "Manufacturing incentives increased",
                "Procurement opportunities expanded"
              ];
              const aiRecommendations = reportData?.aiRecommendations || [
                "Apply for ONGC Tender",
                "Monitor NTPC Procurement",
                "Register for Vendor Opportunities"
              ];

              return (
                <>
                  {/* 1. Header Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Market Intelligence Report</h2>
                      <div className="flex items-center gap-4 mt-2 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {industry || 'All Industries'}</span>
                        <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> {market || 'Global'}</span>
                      </div>
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Generated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* 6. Opportunity Score Card (Prominent) */}
                  <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <TrendingUp className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div>
                        <p className="text-indigo-100 font-medium mb-1 uppercase tracking-wider text-sm">Overall Opportunity Score</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-6xl font-extrabold tracking-tighter">{score}</span>
                          <span className="text-2xl text-indigo-200 font-medium">/100</span>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="font-bold tracking-wide uppercase text-sm">{priority}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Opportunities Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      High Priority Opportunities
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {opportunities.map((opp: any, i: number) => (
                        <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{opp.title}</h4>
                              <p className="text-sm font-medium text-slate-500 mt-1">Value: {opp.value}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${opp.color || 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
                            {opp.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* 3. Competitor Activity Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        Competitor Activity
                      </h3>
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <ul className="divide-y divide-slate-100">
                          {competitorActivity.map((item: string, i: number) => (
                            <li key={i} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                              <div className="mt-0.5 w-2 h-2 rounded-full bg-blue-500" />
                              <span className="text-sm font-medium text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 4. Industry News Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-500" />
                        Industry News
                      </h3>
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <ul className="divide-y divide-slate-100">
                          {industryNews.map((item: string, i: number) => (
                            <li key={i} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                              <div className="mt-0.5 w-2 h-2 rounded-full bg-emerald-500" />
                              <span className="text-sm font-medium text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 5. AI Recommendations Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-indigo-500" />
                      AI Recommendations
                    </h3>
                    <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {aiRecommendations.map((rec: string, i: number) => (
                          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-slate-800 leading-tight">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

          </div>
        )}
      </div>
      </div>
    </div>
  );
}
