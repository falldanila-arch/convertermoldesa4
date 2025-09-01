import { HeroSection } from "@/components/HeroSection";
import { FileConverter } from "@/components/FileConverter";
import { TutorialSection } from "@/components/TutorialSection";
import { TipsSection } from "@/components/TipsSection";
import { ContactSection } from "@/components/ContactSection";
import { FileImage, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Converter Section */}
      <section id="converter" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Conversores Profissionais
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Converta seus arquivos entre PDF e XPS com qualidade profissional. 
              Ideal para moldes de costura que precisam manter dimensões exatas na impressão.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FileConverter
              title="PDF para XPS (Poster)"
              description="Converta PDFs para XPS em formato poster, ideal para impressão em grandes dimensões"
              fromFormat="PDF"
              toFormat="XPS"
              icon={<FileImage className="h-6 w-6" />}
              gradientClass="bg-gradient-primary"
            />
            
            <FileConverter
              title="XPS para PDF"
              description="Converta arquivos XPS de volta para PDF quando necessário"
              fromFormat="XPS"
              toFormat="PDF"
              icon={<FileText className="h-6 w-6" />}
              gradientClass="bg-gradient-secondary"
            />
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-center text-primary">
                🎯 Por que usar nosso conversor?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <p className="font-semibold">Dimensões Precisas</p>
                      <p className="text-sm text-muted-foreground">Mantém as medidas exatas dos moldes, essencial para costura profissional</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <p className="font-semibold">Formato Poster</p>
                      <p className="text-sm text-muted-foreground">Converte para impressão em azulejo, ideal para moldes grandes</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <p className="font-semibold">Qualidade Profissional</p>
                      <p className="text-sm text-muted-foreground">Mantém alta resolução para impressoras industriais</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <div>
                      <p className="font-semibold">Rápido e Seguro</p>
                      <p className="text-sm text-muted-foreground">Processamento local, seus arquivos ficam seguros</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TutorialSection />
      <TipsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Molde Posters Digital</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Sua solução completa para conversão de moldes PDF/XPS e muito mais. 
              Transforme seus projetos de costura com qualidade profissional.
            </p>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60">
              © 2024 Molde Posters Digital. Desenvolvido com 💜 para costureiras e estilistas profissionais.
            </p>
            <p className="text-white/60 mt-2">
              Visite: <a href="https://modelagemediversos.site" className="text-primary underline">modelagemediversos.site</a> • 
              WhatsApp: <a href="https://wa.me/5535998121698" className="text-primary underline">(35) 9 9812-1698</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
