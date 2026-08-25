import React, { useState } from 'react';
import {
  FileText,
  Download,
  FileSpreadsheet,
  Calendar,
  CheckCircle2,
  Printer,
  Sparkles,
  Building,
  IndianRupee,
  ShieldCheck,
  Clock,
  Filter,
  ArrowRight,
  Truck,
  RotateCcw,
  Users,
  Package,
  FileCheck2
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const Reports = () => {
  const toast = useToast();
  const [downloading, setDownloading] = useState(null);
  const [customReportType, setCustomReportType] = useState('sales_summary');
  const [customFormat, setCustomFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('current_month');
  const [generatingCustom, setGeneratingCustom] = useState(false);

  const reportTypes = [
    {
      id: 'sales_summary',
      title: 'Monthly GMV & Sales Revenue Summary',
      description: 'Comprehensive line-item gross transaction values, taxes, net margins, and payment method reconciliations.',
      type: 'Financial Report',
      format: 'CSV / Excel',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      icon: IndianRupee,
      iconColor: 'bg-purple-50 text-purple-600',
      updated: 'Today, 10:00 AM',
      size: '1.4 MB',
    },
    {
      id: 'gst_tax',
      title: 'GST / Indirect Tax Compliance Filings (GSTR-1 / 3B)',
      description: 'State-wise CGST (9%), SGST (9%), and IGST (18%) tax breakdowns structured for official GST portal filing.',
      type: 'Tax & Compliance',
      format: 'Govt Format CSV',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: Building,
      iconColor: 'bg-emerald-50 text-emerald-600',
      updated: 'Today, 09:30 AM',
      size: '840 KB',
    },
    {
      id: 'inventory_valuation',
      title: 'Warehouse Stock Valuation & Cost Audit',
      description: 'Complete stock-on-hand audit with landed cost prices, retail MRPs, SKU variants, and restock replenishment flags.',
      type: 'Inventory Audit',
      format: 'Excel / PDF',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: Package,
      iconColor: 'bg-blue-50 text-blue-600',
      updated: 'Today, 11:15 AM',
      size: '2.1 MB',
    },
    {
      id: 'customer_ltv',
      title: 'Customer Lifetime Value & Cohort Ledger',
      description: 'Directory of VIP, frequent, and at-risk shoppers with cumulative spend, frequency, and city clusters.',
      type: 'Customer CRM',
      format: 'CSV / Excel',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: Users,
      iconColor: 'bg-amber-50 text-amber-600',
      updated: 'Yesterday, 06:00 PM',
      size: '980 KB',
    },
    {
      id: 'shipping_logistics',
      title: 'BlueDart & Delhivery Logistics Performance',
      description: 'Full courier manifest with AWB tracking numbers, delivery turnaround, transit SLA, and reverse logistics costs.',
      type: 'Logistics SLA',
      format: 'CSV / PDF',
      badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',
      icon: Truck,
      iconColor: 'bg-sky-50 text-sky-600',
      updated: 'Today, 08:45 AM',
      size: '1.1 MB',
    },
    {
      id: 'returns_refunds',
      title: 'Returns, Size Exchanges & RMA Ledger',
      description: 'Reconciliation of cancelled orders, size replacement dispatches, and UPI refund transaction UTR numbers.',
      type: 'RMA Reconciliation',
      format: 'CSV',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
      icon: RotateCcw,
      iconColor: 'bg-rose-50 text-rose-600',
      updated: 'Today, 07:30 AM',
      size: '620 KB',
    },
  ];

  const recentExports = [
    {
      name: 'Kiaan_Sales_Revenue_Q2_2026.csv',
      type: 'Financial',
      generatedBy: 'Kiaan Sharma (Admin)',
      date: 'Today, 10:00 AM',
      size: '1.4 MB',
      status: 'Ready',
    },
    {
      name: 'GSTR_1_Tax_Filing_August_2026.csv',
      type: 'Tax & Compliance',
      generatedBy: 'Kiaan Sharma (Admin)',
      date: 'Today, 09:30 AM',
      size: '840 KB',
      status: 'Ready',
    },
    {
      name: 'Stock_Valuation_Warehouse_Mumbai.xlsx',
      type: 'Inventory',
      generatedBy: 'Automated Cron Job',
      date: 'Yesterday, 11:59 PM',
      size: '2.1 MB',
      status: 'Ready',
    },
    {
      name: 'VIP_Customer_Cohort_Export.csv',
      type: 'CRM Ledger',
      generatedBy: 'Aarav Patel (Manager)',
      date: '23 Aug 2026, 04:15 PM',
      size: '980 KB',
      status: 'Ready',
    },
  ];

  const handleDownloadReport = (report) => {
    setDownloading(report.id);
    setTimeout(() => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        `"Kiaan Technology PRO - ${report.title}"\nGenerated: ${new Date().toLocaleString()}\nCompliance: Verified for CA Audit\n\nRecord_ID,Category,Transaction_Value_INR,Tax_GST_INR,Net_Amount_INR,Status\n#REC-9011,Women's Ethnic,2499,450,2049,Verified\n#REC-9012,Men's Casuals,1599,288,1311,Verified\n#REC-9013,Men's Formals,3999,720,3279,Verified\n`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${report.id}_${Date.now()}.${report.format.includes('PDF') ? 'csv' : 'csv'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(null);
      toast.success(`${report.title} downloaded successfully!`);
    }, 600);
  };

  const handleGenerateCustom = (e) => {
    e.preventDefault();
    setGeneratingCustom(true);
    setTimeout(() => {
      setGeneratingCustom(false);
      const sampleReport = reportTypes.find((r) => r.id === customReportType) || reportTypes[0];
      handleDownloadReport(sampleReport);
    }, 800);
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-fade-in pb-12">
      {/* 1. Header */}
      <PageHeader
        title="Downloadable Reports & Financials"
        subtitle="Generate automated compliance sheets, tax audits, inventory valuations, and accounting exports"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'Reports' }]}
      />

      {/* 2. Top Financial & Compliance Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Financials Exported"
          value={formatCurrency(284920)}
          change="+24.8%"
          isPositive={true}
          subtitle="Gross ledger volume"
          icon={IndianRupee}
          colorScheme="purple"
        />
        <StatCard
          title="GST Tax Collected (Q2)"
          value={formatCurrency(34190)}
          change="+18.2%"
          isPositive={true}
          subtitle="CGST (9%) + SGST (9%)"
          icon={Building}
          colorScheme="green"
        />
        <StatCard
          title="Warehouse Stock Valuation"
          value={formatCurrency(1480000)}
          change="+12.4%"
          isPositive={true}
          subtitle="1,248 items on hand"
          icon={Package}
          colorScheme="blue"
        />
        <StatCard
          title="Tax Audit Compliance"
          value="100% Verified"
          change="GST-3B Ready"
          isPositive={true}
          subtitle="Automated CA reconciliations"
          icon={ShieldCheck}
          colorScheme="warm"
        />
      </div>

      {/* 3. Row 1: 6 Professional Report Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            <h3 className="text-base font-black text-slateText-main">Standard Compliance & Operations Ledgers</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">6 Standard Formats</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reportTypes.map((rep) => {
            const Icon = rep.icon;
            const isBusy = downloading === rep.id;

            return (
              <div
                key={rep.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm flex flex-col justify-between space-y-4 hover:border-brand-300 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${rep.badgeColor}`}>
                      {rep.type}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {rep.format}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-2xl ${rep.iconColor} flex items-center justify-center shrink-0 shadow-soft-xs mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slateText-main leading-snug group-hover:text-brand-600 transition-colors">
                        {rep.title}
                      </h4>
                      <p className="text-xs text-slateText-muted mt-1 leading-relaxed font-medium">
                        {rep.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[10px] text-slate-400 font-semibold">
                    <span>{rep.updated}</span> • <span>{rep.size}</span>
                  </div>

                  <button
                    disabled={isBusy}
                    onClick={() => handleDownloadReport(rep)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-black shadow-purple-glow transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isBusy ? 'Exporting...' : 'Download'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Row 2: Custom Date Range Report Generator Bar */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#F4F0FD] via-[#ECE5FC] to-[#F8F5FF] border border-[#E7E0F7] shadow-soft-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <h3 className="text-base font-black text-slateText-main">Custom Date Range & Filtered Ledger Export</h3>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Filter line-item transactions, specific payment modes, or custom fiscal quarters
            </p>
          </div>
          <span className="text-[11px] font-black text-brand-700 bg-white/80 px-3 py-1 rounded-full border border-[#E7E0F7] shadow-soft-xs">
            Instant CSV & Excel Generator
          </span>
        </div>

        <form onSubmit={handleGenerateCustom} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Report Type Selector */}
          <div>
            <label className="block text-[11px] font-black text-slate-600 mb-1">Report Category</label>
            <select
              value={customReportType}
              onChange={(e) => setCustomReportType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#E7E0F7] text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
            >
              <option value="sales_summary">Sales & GMV Revenue</option>
              <option value="gst_tax">GST Compliance (GSTR-1/3B)</option>
              <option value="inventory_valuation">Warehouse Inventory Stock</option>
              <option value="customer_ltv">Customer Cohorts & LTV</option>
              <option value="shipping_logistics">Courier & AWB Logistics</option>
              <option value="returns_refunds">Returns & RMA Ledger</option>
            </select>
          </div>

          {/* Date Range Selector */}
          <div>
            <label className="block text-[11px] font-black text-slate-600 mb-1">Time Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#E7E0F7] text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
            >
              <option value="current_month">Current Month (August 2026)</option>
              <option value="last_month">Last Month (July 2026)</option>
              <option value="current_quarter">Current Quarter (Q2 FY26-27)</option>
              <option value="last_quarter">Previous Quarter (Q1 FY26-27)</option>
              <option value="ytd">Full Year to Date (FY26)</option>
            </select>
          </div>

          {/* Export File Format */}
          <div>
            <label className="block text-[11px] font-black text-slate-600 mb-1">File Format</label>
            <select
              value={customFormat}
              onChange={(e) => setCustomFormat(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#E7E0F7] text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
            >
              <option value="csv">CSV Spreadsheet (.csv)</option>
              <option value="excel">Microsoft Excel (.xlsx)</option>
              <option value="pdf">Auditor PDF Statement (.pdf)</option>
            </select>
          </div>

          {/* Submit Action */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={generatingCustom}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#6C4DF6] hover:bg-[#5B3CE4] text-white text-xs font-black shadow-purple-glow transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{generatingCustom ? 'Generating...' : 'Export Custom Ledger'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 5. Row 3: Recent Generated Reports Audit Log */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E0F7] shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-500" />
              <h3 className="text-base font-black text-slateText-main">Recent Exports & Download History</h3>
            </div>
            <p className="text-xs text-slateText-muted mt-0.5 font-medium">
              Audit log of files generated by store admins, managers, and automated cron tasks
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            4 Recent Exports
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Filename</th>
                <th className="pb-3">Report Type</th>
                <th className="pb-3">Generated By</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">File Size</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {recentExports.map((exp, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#F4F0FD] text-brand-600 flex items-center justify-center shrink-0">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono font-bold text-slate-900">{exp.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 font-bold text-slate-600">{exp.type}</td>
                  <td className="py-3.5 text-slate-500 font-semibold">{exp.generatedBy}</td>
                  <td className="py-3.5 text-slate-500 font-medium">{exp.date}</td>
                  <td className="py-3.5 font-mono text-slate-600 font-bold">{exp.size}</td>
                  <td className="py-3.5 pr-2 text-right">
                    <button
                      onClick={() => handleDownloadReport({ id: 're_download', title: exp.name, format: 'CSV' })}
                      className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-black text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Re-download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
