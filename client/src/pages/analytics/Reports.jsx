import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, Calendar, CheckCircle2, Printer } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const Reports = () => {
  const toast = useToast();
  const [downloading, setDownloading] = useState(null);

  const reportTypes = [
    {
      id: 'sales_summary',
      title: 'Monthly GMV & Sales Revenue Summary',
      description: 'Comprehensive line-item gross transaction values, taxes, net margins, and payment method reconciliations.',
      type: 'Financial Report',
      format: 'CSV / Excel',
    },
    {
      id: 'inventory_valuation',
      title: 'Warehouse Inventory Valuation & Stock Audit',
      description: 'Complete stock-on-hand audit with cost prices, retail values, SKU variants, and low-stock replenishment flags.',
      type: 'Inventory Report',
      format: 'CSV / PDF',
    },
    {
      id: 'gst_tax',
      title: 'GST / Indirect Tax Compliance Filings',
      description: 'CGST, SGST, and IGST breakdowns categorized by state jurisdictions for quarterly filing.',
      type: 'Tax & Compliance',
      format: 'CSV',
    },
    {
      id: 'customer_ltv',
      title: 'Customer Lifetime Cohort & Segmentation Export',
      description: 'Directory of VIP, returning, and at-risk shoppers with cumulative spend and order counts.',
      type: 'Customer Data',
      format: 'CSV',
    },
  ];

  const handleDownloadReport = (report) => {
    setDownloading(report.id);
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + `"${report.title}"\nGenerated on: ${new Date().toISOString()}\n\nSample Column A,Sample Column B,Sample Metric\nRecord 1,Verified,100\nRecord 2,Processed,250\n`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${report.id}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(null);
      toast.success(`${report.title} downloaded successfully!`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Downloadable Reports & Financials"
        subtitle="Generate automated compliance sheets, tax audits, inventory valuations, and accounting exports"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Analytics' }, { label: 'Reports' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((rep) => (
          <div key={rep.id} className="commerce-card p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-black uppercase text-brand-600 px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200">
                  {rep.type}
                </span>
                <span className="text-xs font-mono text-slateText-muted font-bold">
                  {rep.format}
                </span>
              </div>

              <h3 className="text-base font-bold text-slateText-main">{rep.title}</h3>
              <p className="text-xs text-slateText-muted mt-1.5 leading-relaxed font-medium">
                {rep.description}
              </p>
            </div>

            <div className="pt-4 border-t border-surface-border flex items-center justify-between">
              <span className="text-[11px] text-slateText-muted font-semibold">
                Updated: Today, 10:00 AM
              </span>
              <Button
                size="sm"
                variant="primary"
                icon={Download}
                loading={downloading === rep.id}
                onClick={() => handleDownloadReport(rep)}
              >
                Download Report
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
