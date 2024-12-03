declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  interface UserOptions {
    head?: any[][];
    body?: any[][];
    foot?: any[][];
    startY?: number;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    pageBreak?: 'auto' | 'avoid' | 'always';
    rowPageBreak?: 'auto' | 'avoid';
    showHead?: 'everyPage' | 'firstPage' | 'never';
    showFoot?: 'everyPage' | 'lastPage' | 'never';
    headStyles?: any;
    bodyStyles?: any;
    footStyles?: any;
    columnStyles?: {
      [key: number]: any;
    };
    styles?: any;
    theme?: 'striped' | 'grid' | 'plain';
    horizontalPageBreak?: boolean;
    horizontalPageBreakRepeat?: number | string;
  }

  interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: UserOptions) => void;
    lastAutoTable: {
      finalY: number;
    };
  }

  function autoTable(doc: jsPDF, options: UserOptions): void;
  export default autoTable;
}
