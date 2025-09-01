import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Upload, Download, RefreshCw, Printer, FileImage, FileText } from "lucide-react";

export const TutorialSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Como Usar o Conversor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Siga este tutorial passo-a-passo para converter seus moldes PDF para impressão em azulejo (formato poster)
          </p>
        </div>

        {/* Processo PDF para XPS */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="shadow-elegant border-2 border-primary/20">
            <CardHeader className="bg-gradient-primary text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileImage className="h-8 w-8" />
                Parte 1: PDF → XPS (Formato Poster)
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Transforme seu molde PDF em formato azulejo para impressão grande
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Passo 1</h4>
                    <p className="text-sm">Clique em "Selecionar arquivo PDF" no primeiro conversor</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <FileImage className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Passo 2</h4>
                    <p className="text-sm">Escolha seu arquivo PDF do molde</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <RefreshCw className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Passo 3</h4>
                    <p className="text-sm">Clique em "Converter para XPS"</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Passo 4</h4>
                    <p className="text-sm">Baixe o arquivo convertido</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center mb-16">
          <Separator className="flex-1 max-w-xs" />
          <span className="mx-6 text-muted-foreground font-medium">AGORA</span>
          <Separator className="flex-1 max-w-xs" />
        </div>

        {/* Processo XPS para PDF */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="shadow-elegant border-2 border-accent/20">
            <CardHeader className="bg-gradient-secondary text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileText className="h-8 w-8" />
                Parte 2: XPS → PDF (Finalização)
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Converta de volta para PDF otimizado para sua impressora
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent">Passo 1</h4>
                    <p className="text-sm">Use o arquivo XPS baixado na etapa anterior</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent">Passo 2</h4>
                    <p className="text-sm">Faça upload no segundo conversor (XPS → PDF)</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                    <RefreshCw className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent">Passo 3</h4>
                    <p className="text-sm">Clique em "Converter para PDF"</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                    <Printer className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent">Passo 4</h4>
                    <p className="text-sm">Baixe e imprima seu molde!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dicas importantes */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary">
                💡 Dicas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                    <div>
                      <p className="font-semibold text-primary">Formato Azulejo</p>
                      <p className="text-sm text-muted-foreground">O XPS divide cada página em 4 partes para impressão em folhas A4</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-primary">Qualidade</p>
                      <p className="text-sm text-muted-foreground">Mantém resolução alta para impressão profissional</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">📏</span>
                    <div>
                      <p className="font-semibold text-primary">Medidas Exatas</p>
                      <p className="text-sm text-muted-foreground">Cole as partes com precisão para manter dimensões</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">🖨️</span>
                    <div>
                      <p className="font-semibold text-primary">Impressão</p>
                      <p className="text-sm text-muted-foreground">Configure sua impressora para 100% sem ajuste de escala</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};