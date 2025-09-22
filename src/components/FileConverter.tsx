import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, FileImage, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PDFConverter } from "@/lib/pdfConverter";
import { PdfPreview } from "@/components/PdfPreview";

interface FileConverterProps {
  title: string;
  description: string;
  fromFormat: string;
  toFormat: string;
  icon: React.ReactNode;
  gradientClass: string;
}

export const FileConverter = ({ 
  title, 
  description, 
  fromFormat, 
  toFormat, 
  icon, 
  gradientClass 
}: FileConverterProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [convertedFileName, setConvertedFileName] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validar tipo de arquivo
      const expectedExtension = fromFormat.toLowerCase();
      const fileName = selectedFile.name.toLowerCase();
      
      if (!fileName.endsWith(`.${expectedExtension}`) && !fileName.endsWith('.pdf')) {
        toast.error(`Por favor, selecione um arquivo ${fromFormat} válido!`);
        return;
      }
      
      setFile(selectedFile);
      setConvertedFile(null);
      setConvertedFileName("");
      toast.success(`Arquivo ${selectedFile.name} carregado com sucesso!`);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error("Por favor, selecione um arquivo primeiro!");
      return;
    }

    setIsConverting(true);
    
    try {
      let convertedBlob: Blob;
      const baseFileName = file.name.split('.')[0];
      
      if (fromFormat === "PDF" && toFormat === "XPS") {
        convertedBlob = await PDFConverter.convertPdfToXpsFormat(file);
        setConvertedFileName(`${baseFileName}_poster.pdf`);
        toast.success("PDF convertido para formato poster dividido com sucesso!");
      } else {
        throw new Error("Formato de conversão não suportado");
      }
      
      setConvertedFile(convertedBlob);
    } catch (error) {
      console.error("Erro na conversão:", error);
      toast.error("Erro ao converter arquivo. Verifique se o arquivo é válido.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFile && convertedFileName) {
      PDFConverter.downloadFile(convertedFile, convertedFileName);
      toast.success("Download iniciado! Verifique sua pasta de downloads.");
    }
  };

  return (
    <Card className="shadow-card border-2 hover:shadow-soft transition-all duration-300">
      <CardHeader className={`${gradientClass} text-white rounded-t-lg`}>
        <CardTitle className="flex items-center gap-3 text-xl">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="text-white/90">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary transition-colors">
          <input
            type="file"
            accept={`.${fromFormat.toLowerCase()}`}
            onChange={handleFileUpload}
            className="hidden"
            id={`file-${fromFormat}`}
          />
          <label 
            htmlFor={`file-${fromFormat}`}
            className="cursor-pointer space-y-4 block"
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium">
                Clique para selecionar arquivo {fromFormat}
              </p>
              <p className="text-sm text-muted-foreground">
                Arraste e solte ou clique para fazer upload
              </p>
            </div>
          </label>
        </div>

        {file && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Arquivo selecionado:</p>
            <p className="text-sm text-muted-foreground">{file.name}</p>
          </div>
        )}

        <Button 
          onClick={handleConvert}
          disabled={!file || isConverting}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Convertendo...
            </>
          ) : (
            `Converter para ${toFormat}`
          )}
        </Button>

        {convertedFile && (
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-white"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar {convertedFileName}
          </Button>
        )}

        <PdfPreview file={file} />
      </CardContent>
    </Card>
  );
};