import { PDFDocument, rgb, PageSizes } from 'pdf-lib';
import { saveAs } from 'file-saver';

export class PDFConverter {
  static async convertPdfToXpsFormat(file: File): Promise<Blob> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Criar um novo documento para o formato "poster" (azulejo)
      const posterDoc = await PDFDocument.create();
      
      const pages = pdfDoc.getPages();
      
      for (const page of pages) {
        const { width, height } = page.getSize();
        
        // Dividir cada página em 4 quadrantes para formato azulejo
        const quadrantWidth = width / 2;
        const quadrantHeight = height / 2;
        
        // Criar 4 páginas A4 para cada página original
        for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 2; col++) {
            const newPage = posterDoc.addPage(PageSizes.A4);
            const [embeddedPage] = await posterDoc.embedPdf(pdfDoc, [pages.indexOf(page)]);
            
            // Calcular posição e escala para o quadrante
            const x = -col * quadrantWidth * 2;
            const y = -(1-row) * quadrantHeight * 2;
            
            newPage.drawPage(embeddedPage, {
              x: x,
              y: y,
              width: width * 2,
              height: height * 2,
            });
            
            // Adicionar marcações de corte
            newPage.drawText(`Quadrante ${row + 1}-${col + 1}`, {
              x: 20,
              y: newPage.getHeight() - 30,
              size: 12,
              color: rgb(0, 0, 0),
            });
          }
        }
      }
      
      const pdfBytes = await posterDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
      
    } catch (error) {
      console.error('Erro na conversão PDF para XPS:', error);
      throw new Error('Falha na conversão do arquivo');
    }
  }

  static async convertXpsToPdf(file: File): Promise<Blob> {
    try {
      // Para arquivos XPS (ou PDFs no formato poster), vamos reconverter para PDF normal
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Criar documento final otimizado
      const finalDoc = await PDFDocument.create();
      const pages = pdfDoc.getPages();
      
      // Agrupar páginas em conjuntos de 4 (quadrantes) e recompor
      for (let i = 0; i < pages.length; i += 4) {
        const quadrantPages = pages.slice(i, i + 4);
        
        if (quadrantPages.length === 4) {
          const newPage = finalDoc.addPage(PageSizes.A3); // Página maior para melhor qualidade
          
          // Recompor os 4 quadrantes em uma página
          const pageWidth = newPage.getWidth();
          const pageHeight = newPage.getHeight();
          
          for (let j = 0; j < quadrantPages.length; j++) {
            const [embeddedPage] = await finalDoc.embedPdf(pdfDoc, [i + j]);
            const row = Math.floor(j / 2);
            const col = j % 2;
            
            newPage.drawPage(embeddedPage, {
              x: col * pageWidth / 2,
              y: (1 - row) * pageHeight / 2,
              width: pageWidth / 2,
              height: pageHeight / 2,
            });
          }
        }
      }
      
      const pdfBytes = await finalDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
      
    } catch (error) {
      console.error('Erro na conversão XPS para PDF:', error);
      throw new Error('Falha na conversão do arquivo');
    }
  }

  static downloadFile(blob: Blob, filename: string) {
    saveAs(blob, filename);
  }
}