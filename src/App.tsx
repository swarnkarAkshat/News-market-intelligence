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
  "Heavy Industries",
  "Discrete Manufacturing",
  "Oil & Gas",
  "Melting, Heating & Welding Industry",
  "Pipe Manufacturing, Cutting/Shearing",
  "Material Handling",
  "Food & Pharma",
  "Special Purpose Machinery"
];

const productOptions = [
  "Special Purpose Machinery (SPM)",
  "Material Handling Equipment",
  "Valves & Fasteners",
  "Electrical & Electronic Systems",
  "Automation & Robotics",
  "Fire Safety Equipment",
  "Industrial Generators",
  "Machined Components",
  "Conveyors & Cranes",
  "Pumps & Piping"
];

const marketOptions = [
  "India", "Middle East", "North America", "Europe", "Africa", "South East Asia", "Australia"
];

const tenderSources = [
  "ESSNPS Direct RFQs",
  "Global Client Requirements",
  "Vendor Empanelment",
  "Strategic Sourcing Programs",
  "Engineering Outsourcing Projects",
  "Turnkey Supply Contracts",
  "Subcontracting Inquiries",
  "Supplier Development Programs"
];

const valueOptions = [
  "₹5 Lakh", "₹10 Lakh", "₹50 Lakh", "₹1 Crore", "₹5 Crore"
];

const opportunityTypes = [
  "Strategic Sourcing",
  "Detail Engineering",
  "Quality Control & Inspection",
  "Logistics Management",
  "Prototyping Services",
  "Procurement Outsourcing"
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
          <div className="flex items-center gap-6">
            <a href="https://www.essnps.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img
                src="https://www.essnps.com/wp-content/uploads/2025/07/ESSNPS%C2%AE.svg"
                alt="ESSNPS Logo"
                style={{ width: '174.97px', height: '44px', objectFit: 'contain' }}
              />
            </a>
            <div className="h-8 w-px bg-slate-300 hidden sm:block"></div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-indigo-600" />
              News & Market Intelligence
            </h1>
          </div>
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
                // n8n often returns an array of objects. If so, take the first item.
                const report = Array.isArray(reportData) ? reportData[0] : reportData;
                
                // If the data is completely unstructured text, handle it gracefully
                const isRawText = typeof reportData === 'string';

                if (isRawText) {
                  return (
                    <div className="bg-slate-900 rounded-2xl p-6 shadow-sm overflow-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <FileText className="w-5 h-5 text-indigo-400" />
                          Raw n8n Output
                        </h3>
                      </div>
                      <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                        {reportData}
                      </pre>
                    </div>
                  );
                }

                const summary = report?.overall_summary;
                const topOpps = report?.top_opportunities || [];
                const tenders = report?.tenders || [];
                const companiesInt = report?.company_intelligence || [];
                const marketNews = report?.market_news || [];

                return (
                  <>
                    {/* 1. Header Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Market Intelligence Report</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm font-medium text-slate-500">
                          <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {report?.industry_sector || industry || 'Heavy Industries'}</span>
                          <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> {report?.target_region || market || 'India'}</span>
                        </div>
                      </div>
                      <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Scan Date: {report?.scan_date ? new Date(report.scan_date).toLocaleDateString() : new Date().toLocaleDateString()}
                      </div>
                    </div>

                    {/* Scan Overview Metadata */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-wrap gap-4 text-sm">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-slate-400 font-semibold uppercase text-xs mb-1">Product Category</p>
                        <p className="font-medium text-slate-800">{report?.product_category || product || 'N/A'}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-slate-400 font-semibold uppercase text-xs mb-1">Minimum Value</p>
                        <p className="font-medium text-slate-800">{report?.minimum_project_value || minValue || 'N/A'}</p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-slate-400 font-semibold uppercase text-xs mb-1">Sources Scanned</p>
                        <p className="font-medium text-slate-800 truncate" title={Array.isArray(report?.sources_scanned) ? report.sources_scanned.join(', ') : report?.sources_scanned}>
                          {Array.isArray(report?.sources_scanned) ? report.sources_scanned.join(', ') : (report?.sources_scanned || 'N/A')}
                        </p>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-slate-400 font-semibold uppercase text-xs mb-1">Companies Monitored</p>
                        <p className="font-medium text-slate-800 truncate" title={Array.isArray(report?.companies_monitored) ? report.companies_monitored.join(', ') : report?.companies_monitored}>
                          {Array.isArray(report?.companies_monitored) ? report.companies_monitored.join(', ') : (report?.companies_monitored || 'N/A')}
                        </p>
                      </div>
                    </div>

                    {/* 2. Overall Summary */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <TrendingUp className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-indigo-100 font-medium mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                          <Activity className="w-4 h-4" /> Executive Summary
                        </h3>
                        <p className="text-lg leading-relaxed text-white/90">
                          {summary}
                        </p>
                      </div>
                    </div>

                    {/* 3. Top Opportunities */}
                    {topOpps.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-amber-500" />
                          Top Strategic Actions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {topOpps.map((opp: any, i: number) => (
                            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
                              <div className="flex justify-between items-start">
                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${opp.urgency === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                  {opp.urgency} URGENCY
                                </span>
                                <span className="text-xs font-semibold text-slate-500 uppercase">{opp.type}</span>
                              </div>
                              <h4 className="font-bold text-slate-900 leading-tight">{opp.title}</h4>
                              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-auto">
                                <p className="text-sm font-medium text-slate-700"><span className="text-indigo-600 font-bold">Action:</span> {opp.action}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Tenders & RFQs */}
                    {tenders.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-indigo-500" />
                          Active Tenders & RFQs
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {tenders.map((tender: any, i: number) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    <a href={tender.url !== 'empty' ? tender.url : '#'} target="_blank" rel="noopener noreferrer">{tender.title}</a>
                                  </h4>
                                  <p className="text-sm font-medium text-slate-500 mt-1">{tender.issuing_org} • {tender.source}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${tender.urgency === 'HIGH' ? 'text-red-600 bg-red-50 border-red-100' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>
                                  {tender.urgency}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-slate-50 p-4 rounded-xl">
                                <div><p className="text-xs text-slate-400 font-semibold uppercase">Type</p><p className="text-sm font-medium text-slate-800">{tender.opportunity_type}</p></div>
                                <div><p className="text-xs text-slate-400 font-semibold uppercase">Value</p><p className="text-sm font-medium text-slate-800">{tender.project_value}</p></div>
                                <div><p className="text-xs text-slate-400 font-semibold uppercase">Region</p><p className="text-sm font-medium text-slate-800">{tender.target_region}</p></div>
                                <div><p className="text-xs text-slate-400 font-semibold uppercase">Deadline</p><p className="text-sm font-medium text-slate-800">{tender.deadline}</p></div>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed"><span className="font-semibold text-slate-800">Relevance:</span> {tender.relevance}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {/* 5. Company Intelligence */}
                      {companiesInt.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-500" />
                            Company Intelligence
                          </h3>
                          <div className="space-y-4">
                            {companiesInt.map((item: any, i: number) => (
                              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> {item.company}
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-600 mb-3">{item.finding}</p>
                                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                                  <p className="text-xs font-semibold text-blue-800"><span className="uppercase text-blue-500/70 mr-1">Action:</span>{item.action}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 6. Market News */}
                      {marketNews.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Award className="w-5 h-5 text-emerald-500" />
                            Market News & Signals
                          </h3>
                          <div className="space-y-4">
                            {marketNews.map((item: any, i: number) => (
                              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-2 leading-snug">
                                  <a href={item.url !== 'empty' ? item.url : '#'} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">{item.headline}</a>
                                </h4>
                                <p className="text-xs text-slate-400 font-medium mb-3">{item.source}</p>
                                <p className="text-sm text-slate-600 mb-3 line-clamp-3">{item.summary}</p>
                                <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                                  <p className="text-xs font-semibold text-emerald-800"><span className="uppercase text-emerald-500/70 mr-1">Impact:</span>{item.impact}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
