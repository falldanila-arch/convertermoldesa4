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
      
      // Processar todas as páginas do PDF
      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const page = pages[pageIndex];
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
            const [embeddedPage] = await posterDoc.embedPdf(pdfDoc, [pageIndex]);
            
            // Obter dimensões da página A4
            const pageA4Width = newPage.getWidth();
            const pageA4Height = newPage.getHeight();
            
            // Calcular escala para que o quadrante ocupe toda a página A4
            const scaleX = pageA4Width / quadrantWidth;
            const scaleY = pageA4Height / quadrantHeight;
            const scale = Math.min(scaleX, scaleY);
            
            // Calcular escala e posição para mostrar apenas o quadrante atual
            const scaledQuadrantWidth = quadrantWidth * scale;
            const scaledQuadrantHeight = quadrantHeight * scale;
            
            // Centralizar o quadrante na página A4
            const offsetX = (pageA4Width - scaledQuadrantWidth) / 2;
            const offsetY = (pageA4Height - scaledQuadrantHeight) / 2;
            
            // Posição do recorte (qual parte da página original mostrar)
            // Inverter a coordenada Y para PDF (origem no canto inferior esquerdo)
            const cropX = -col * scaledQuadrantWidth;
            const cropY = -(height * scale - (row + 1) * scaledQuadrantHeight);
            
            newPage.drawPage(embeddedPage, {
              x: offsetX + cropX,
              y: offsetY + cropY,
              width: width * scale,
              height: height * scale,
            });
            
            // Adicionar marcações de corte e informações
            newPage.drawText(`Página ${pageIndex + 1} - Quadrante ${row + 1}-${col + 1}`, {
              x: 20,
              y: newPage.getHeight() - 30,
              size: 12,
              color: rgb(0, 0, 0),
            });
            
            // Adicionar informações de montagem
            newPage.drawText(`Cole em: Linha ${row + 1}, Coluna ${col + 1}`, {
              x: 20,
              y: 20,
              size: 10,
              color: rgb(0.5, 0.5, 0.5),
            });
            
            // Adicionar marcas de corte nas bordas
            const markSize = 10;
            // Marca superior esquerda
            newPage.drawLine({
              start: { x: 0, y: a4Height - markSize },
              end: { x: markSize, y: a4Height - markSize },
              thickness: 0.5,
              color: rgb(0, 0, 0),
            });
            newPage.drawLine({
              start: { x: markSize, y: a4Height },
              end: { x: markSize, y: a4Height - markSize },
              thickness: 0.5,
              color: rgb(0, 0, 0),
            });
          }
        }
      }
      
      const pdfBytes = await posterDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
      
    } catch (error) {
      console.error('Erro na conversão PDF para poster:', error);
      throw new Error('Falha na conversão do arquivo');
    }
  }


  static downloadFile(blob: Blob, filename: string) {
    saveAs(blob, filename);
  }
}