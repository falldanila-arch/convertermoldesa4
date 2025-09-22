import { Button } from "@/components/ui/button";
import { ArrowDown, Scissors, Palette } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const HeroSection = () => {
  const scrollToConverter = () => {
    document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(154, 65, 216, 0.9) 0%, rgba(240, 115, 187, 0.8) 50%, rgba(84, 200, 236, 0.9) 100%), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-4 border-white rotate-12"></div>
        <div className="absolute bottom-40 left-40 w-28 h-28 border-4 border-white -rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 border-4 border-white rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <Scissors className="h-6 w-6" />
            <span className="font-medium">Moldes Digitais</span>
            <Palette className="h-6 w-6" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Moldes em A4
          <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            PDF Grande em Impressora Comum
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
          Converta moldes em PDF, Audaces em PDF e moldes CAD para páginas A4. 
          Transforme qualquer PDF grande para impressão em impressora comum com qualidade profissional.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={scrollToConverter}
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-lg"
          >
            Converter Agora
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg"
            onClick={() => window.open('https://mercadolivre.com.br/loja/modelagem-e-diversos', '_blank')}
          >
            Ver Moldes Disponíveis
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">✂️ Moldes Profissionais</h3>
            <p className="text-white/80">A partir de R$ 7,99</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">🎨 Dicas de Sublimação</h3>
            <p className="text-white/80">Aprenda técnicas avançadas</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">📚 Curso Audaces</h3>
            <p className="text-white/80">Modelagem profissional</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white" />
      </div>
    </section>
  );
};