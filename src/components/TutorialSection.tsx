import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, Printer } from "lucide-react";

export const TutorialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Como Usar o Conversor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Siga este processo simples para converter seus PDFs em formato poster dividido para impressão
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Processo Único - PDF para Poster */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                PDF → PDF Dividido em Poster
              </h3>
              <p className="text-muted-foreground">
                Converta seu PDF em formato poster dividido em páginas A4
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Selecione seu arquivo PDF</h4>
                  <p className="text-sm text-muted-foreground">
                    Clique no conversor e selecione o arquivo PDF que deseja dividir em formato poster
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Clique em "Converter"</h4>
                  <p className="text-sm text-muted-foreground">
                    O sistema irá automaticamente dividir cada página do PDF em quadrantes A4 com marcas de corte
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Baixe o PDF dividido</h4>
                  <p className="text-sm text-muted-foreground">
                    Faça o download do arquivo PDF com todas as páginas divididas e prontas para impressão
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Imprima e monte</h4>
                  <p className="text-sm text-muted-foreground">
                    Imprima todas as páginas em A4 e cole seguindo as marcações para formar o poster completo
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Dicas Importantes */}
        <Card className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Printer className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Dicas para Impressão em Formato Poster
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Configuração da Impressora</h4>
                <p className="text-sm text-muted-foreground">
                  Configure sua impressora para imprimir em tamanho real (100%) sem ajuste automático
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Marcações de Orientação</h4>
                <p className="text-sm text-muted-foreground">
                  Cada página tem informações sobre qual página original e posição na montagem
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Montagem Sequencial</h4>
                <p className="text-sm text-muted-foreground">
                  Monte seguindo as marcações "Linha X, Coluna Y" para formar o poster completo
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Marcas de Corte</h4>
                <p className="text-sm text-muted-foreground">
                  Use as marcas de corte nas bordas para alinhamento perfeito na montagem
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};