import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Grid, Puzzle } from "lucide-react";
import { PDFDocument, PageSizes } from 'pdf-lib';

interface PdfPreviewProps {
  file: File | null;
}

export const PdfPreview = ({ file }: PdfPreviewProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showDivisionLines, setShowDivisionLines] = useState(true);
  const [pdfData, setPdfData] = useState<{
    imageUrl: string;
    dimensions: { width: number; height: number };
    gridInfo: { cols: number; rows: number };
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (file && showPreview) {
      loadPdfPreview();
    }
  }, [file, showPreview]);

  useEffect(() => {
    if (pdfData && canvasRef.current) {
      drawPreview();
    }
  }, [pdfData, showDivisionLines]);

  const loadPdfPreview = async () => {
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      if (pages.length === 0) return;

      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // Calcular quantos quadrantes são necessários
      const a4Width = PageSizes.A4[0];
      const a4Height = PageSizes.A4[1];
      const cols = Math.ceil(width / a4Width);
      const rows = Math.ceil(height / a4Height);

      // Converter primeira página para imagem usando canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Criar novo PDF com apenas a primeira página para renderizar
      const singlePageDoc = await PDFDocument.create();
      const [copiedPage] = await singlePageDoc.copyPages(pdfDoc, [0]);
      singlePageDoc.addPage(copiedPage);
      
      const pdfBytes = await singlePageDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setPdfData({
        imageUrl: url,
        dimensions: { width, height },
        gridInfo: { cols, rows }
      });

    } catch (error) {
      console.error('Erro ao carregar preview do PDF:', error);
    }
  };

  const drawPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas || !pdfData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = pdfData.dimensions;
    const { cols, rows } = pdfData.gridInfo;

    // Configurar tamanho do canvas para visualização
    const maxWidth = 600;
    const scale = Math.min(maxWidth / width, 400 / height);
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    // Desenhar fundo do PDF
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, scaledWidth, scaledHeight);

    // Desenhar borda do PDF
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, scaledWidth, scaledHeight);

    if (showDivisionLines) {
      // Desenhar linhas de divisão
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);

      // Linhas verticais
      for (let i = 1; i < cols; i++) {
        const x = (width / cols) * i * scale;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, scaledHeight);
        ctx.stroke();
      }

      // Linhas horizontais
      for (let i = 1; i < rows; i++) {
        const y = (height / rows) * i * scale;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(scaledWidth, y);
        ctx.stroke();
      }

      // Desenhar números dos quadrantes
      ctx.setLineDash([]);
      ctx.fillStyle = '#e74c3c';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const quadrantWidth = scaledWidth / cols;
      const quadrantHeight = scaledHeight / rows;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * quadrantWidth + quadrantWidth / 2;
          const y = row * quadrantHeight + quadrantHeight / 2;
          
          // Fundo semi-transparente para o texto
          ctx.fillStyle = 'rgba(231, 76, 60, 0.8)';
          ctx.fillRect(x - 25, y - 12, 50, 24);
          
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${row + 1}-${col + 1}`, x, y);
        }
      }
    }

    // Adicionar texto informativo
    ctx.fillStyle = '#333333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Divisão: ${cols} x ${rows} = ${cols * rows} páginas A4`, 10, scaledHeight + 20);
  };

  if (!file) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Puzzle className="h-5 w-5" />
          Visualização da Divisão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={showPreview ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
            {showPreview ? "Ocultar" : "Mostrar"} Preview
          </Button>
          
          {showPreview && (
            <Button
              variant={showDivisionLines ? "default" : "outline"}
              size="sm"
              onClick={() => setShowDivisionLines(!showDivisionLines)}
            >
              <Grid className="h-4 w-4 mr-2" />
              {showDivisionLines ? "Ocultar" : "Mostrar"} Linhas
            </Button>
          )}
        </div>

        {showPreview && (
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex justify-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="border border-muted rounded shadow-sm max-w-full"
                />
                {pdfData && (
                  <div className="mt-2 text-sm text-muted-foreground text-center">
                    <p>PDF original será dividido em <strong>{pdfData.gridInfo.cols} x {pdfData.gridInfo.rows}</strong> páginas A4</p>
                    <p className="text-xs mt-1">Linhas vermelhas mostram onde será cortado • Números indicam ordem das páginas</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};