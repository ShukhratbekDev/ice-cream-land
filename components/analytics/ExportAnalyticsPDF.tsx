'use client';

import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { SalesByRegionItem } from './SalesByRegionChart';
import { SalesByMonthItem } from './SalesByMonthChart';
import jsPDF, { jsPDF as jsPDFType } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ExportAnalyticsPDF() {
  const { data, isLoading } = useAnalytics();
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    try {
      setIsExporting(true);

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      // Title
      doc.setFontSize(20);
      doc.text('Sales Analytics Report', pageWidth / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Generated on: ${format(new Date(), 'PPP')}`, pageWidth / 2, 30, { align: 'center' });

      // Sales by Region
      doc.setFontSize(16);
      doc.text('Sales by Region', 14, 45);

      const regionData =
        data?.salesByRegion?.map((item: SalesByRegionItem) => [
          item.regionId,
          `$${parseFloat(item.totalSales).toLocaleString()}`,
        ]) || [];

      autoTable(doc, {
        startY: 50,
        head: [['Region', 'Total Sales']],
        body: regionData,
        headStyles: { fillColor: [156, 39, 176] },
        styles: { halign: 'center' },
        columnStyles: {
          0: { halign: 'left' },
          1: { halign: 'right' },
        },
      });

      // Sales by Month
      doc.setFontSize(16);
      const lastTableEnd = (doc as jsPDFType & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
      doc.text('Sales by Month', 14, lastTableEnd + 20);

      const monthData =
        data?.salesByMonth?.map((item: SalesByMonthItem) => [
          format(parseISO(item.month + '-01'), 'MMMM yyyy'),
          `$${parseFloat(item.totalSales).toLocaleString()}`,
        ]) || [];

      autoTable(doc, {
        startY: lastTableEnd + 25,
        head: [['Month', 'Total Sales']],
        body: monthData,
        headStyles: { fillColor: [156, 39, 176] },
        styles: { halign: 'center' },
        columnStyles: {
          0: { halign: 'left' },
          1: { halign: 'right' },
        },
      });

      // Save the PDF
      doc.save('sales-analytics-report.pdf');
      toast({
        title: 'Success',
        description: 'Sales analytics report has been downloaded.',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate the sales report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={isLoading || isExporting} variant="outline" size="sm" className="gap-2">
      <Download className="h-4 w-4" />
      {isExporting ? 'Exporting...' : 'Export PDF'}
    </Button>
  );
}
