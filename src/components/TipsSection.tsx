import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Scissors, Palette, Thermometer, Clock, Star } from "lucide-react";

export const TipsSection = () => {
  const tips = [
    {
      icon: <Thermometer className="h-6 w-6" />,
      title: "Temperatura Ideal",
      content: "Para sublimação em tecidos, use temperatura entre 180-200°C por 45-60 segundos. Sempre faça testes antes da produção final."
    },
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Corte Preciso",
      content: "Use cortadores rotativos para cortes mais precisos. Marque sempre o fio do tecido antes de cortar para evitar distorções."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Cores Vibrantes",
      content: "Para cores mais vibrantes na sublimação, use tecidos com alto percentual de poliéster (mínimo 65%). Tecidos 100% poliéster dão os melhores resultados."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Tempo de Prensa",
      content: "Respeite o tempo de prensagem. Pouco tempo resulta em cores desbotadas, muito tempo pode queimar o tecido."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Acabamento Profissional",
      content: "Use papel protetor (teflon) entre a prensa e o tecido para evitar marcas e garantir acabamento uniforme."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Moldes em PDF",
      content: "Converta seus moldes para XPS para impressão em tamanho real. O formato XPS mantém as dimensões exatas, essencial para moldes precisos."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Dicas Profissionais
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprenda técnicas essenciais para costura e sublimação que farão a diferença nos seus projetos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  {tip.icon}
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {tip.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">💡 Dica Extra</h3>
            <p className="text-lg mb-6">
              Nossos moldes digitais são testados e aprovados por profissionais da área. Cada molde vem com instruções detalhadas de montagem e costura.
            </p>
            <p className="text-white/90">
              ✅ Moldes em múltiplos tamanhos • ✅ Instruções ilustradas • ✅ Suporte técnico
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};