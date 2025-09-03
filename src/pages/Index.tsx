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
              Converter Moldes em A4
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Transforme moldes em PDF grandes para impressão em A4 comum. Converta moldes CAD, 
              Audaces em PDF e qualquer PDF grande para impressora comum dividido em páginas A4.
              Perfeito para moldes de costura, modelagem e projetos profissionais.
            </p>
          </div>

          <div className="flex justify-center max-w-4xl mx-auto">
            <FileConverter
              title="Converter Moldes em A4 - PDF Grande para A4"
              description="Converta moldes em PDF, Audaces em PDF, moldes CAD para páginas A4 em impressora comum"
              fromFormat="PDF"
              toFormat="XPS"
              icon={<FileText className="h-6 w-6" />}
              gradientClass="bg-gradient-primary"
            />
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Divisão Automática</h3>
                <p className="text-muted-foreground">
                  Divide automaticamente seu PDF em páginas A4 para impressão
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileImage className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Seguro</h3>
                <p className="text-muted-foreground">
                  Seus arquivos são processados localmente no seu navegador
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileImage className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Marcas de Corte</h3>
                <p className="text-muted-foreground">
                  Inclui marcações para facilitar a montagem do poster
                </p>
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
              Visite: <a href="https://mercadolivre.com.br/loja/modelagem-e-diversos" className="text-primary underline">MercadoLivre - Modelagem e Diversos</a> • 
              WhatsApp: <a href="https://wa.me/5535998121698" className="text-primary underline">(35) 9 9812-1698</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
