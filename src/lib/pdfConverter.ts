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
        
        // Calcular quantos quadrantes são necessários baseado no tamanho A4
        const a4Width = PageSizes.A4[0];
        const a4Height = PageSizes.A4[1];
        
        // Calcular quantas divisões são necessárias para cobrir toda a página
        const cols = Math.ceil(width / a4Width);
        const rows = Math.ceil(height / a4Height);
        
        const quadrantWidth = width / cols;
        const quadrantHeight = height / rows;
        
        // Criar páginas A4 para cada quadrante necessário
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const newPage = posterDoc.addPage(PageSizes.A4);
            const [embeddedPage] = await posterDoc.embedPdf(pdfDoc, [pages.indexOf(page)]);
            
            // Obter dimensões da página A4
            const a4Width = newPage.getWidth();
            const a4Height = newPage.getHeight();
            
            // Calcular escala para que o quadrante ocupe toda a página A4
            const scaleX = a4Width / quadrantWidth;
            const scaleY = a4Height / quadrantHeight;
            const scale = Math.min(scaleX, scaleY);
            
            // Calcular posição para centralizar o quadrante na página A4
            const scaledWidth = width * scale;
            const scaledHeight = height * scale;
            const offsetX = (a4Width - scaledWidth) / 2;
            const offsetY = (a4Height - scaledHeight) / 2;
            
            // Posição do recorte (qual parte da página original mostrar)
            const cropX = -col * quadrantWidth * scale;
            const cropY = -(1 - row) * quadrantHeight * scale;
            
            newPage.drawPage(embeddedPage, {
              x: offsetX + cropX,
              y: offsetY + cropY,
              width: scaledWidth,
              height: scaledHeight,
            });
            
            // Adicionar marcações de corte e informações
            newPage.drawText(`Quadrante ${row + 1}-${col + 1}`, {
              x: 20,
              y: newPage.getHeight() - 30,
              size: 12,
              color: rgb(0, 0, 0),
            });
            
            // Adicionar linhas de referência nas bordas
            newPage.drawText(`Página ${pages.indexOf(page) + 1} - Setor ${row + 1}${col + 1}`, {
              x: 20,
              y: 20,
              size: 10,
              color: rgb(0.5, 0.5, 0.5),
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
      
      // Reconverter dinamicamente baseado na estrutura real do arquivo
      const finalDoc = await PDFDocument.create();
      const pages = pdfDoc.getPages();
      
      // Detectar padrão de divisão através das marcações de texto
      let currentPageParts = [];
      let maxRow = 0, maxCol = 0;
      
      // Analisar as páginas para detectar o padrão de divisão
      for (let i = 0; i < pages.length; i++) {
        currentPageParts.push(pages[i]);
        
        // Quando completar uma página original (detectar início de nova página)
        if (i + 1 >= pages.length || 
            (i + 1) % Math.ceil(Math.sqrt(pages.length)) === 0) {
          
          if (currentPageParts.length > 0) {
            // Calcular dimensões da grade baseado no número de partes
            const totalParts = currentPageParts.length;
            const cols = Math.ceil(Math.sqrt(totalParts));
            const rows = Math.ceil(totalParts / cols);
            
            const newPage = finalDoc.addPage(PageSizes.A3);
            const pageWidth = newPage.getWidth();
            const pageHeight = newPage.getHeight();
            
            // Recompor todas as partes em uma página
            for (let j = 0; j < currentPageParts.length; j++) {
              const [embeddedPage] = await finalDoc.embedPdf(pdfDoc, [i - currentPageParts.length + 1 + j]);
              const row = Math.floor(j / cols);
              const col = j % cols;
              
              newPage.drawPage(embeddedPage, {
                x: col * pageWidth / cols,
                y: (rows - 1 - row) * pageHeight / rows,
                width: pageWidth / cols,
                height: pageHeight / rows,
              });
            }
          }
          
          currentPageParts = [];
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