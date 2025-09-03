import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ExternalLink, ShoppingBag, GraduationCap, Phone } from "lucide-react";

export const ContactSection = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/5535998121698', '_blank');
  };

  const openWebsite = () => {
    window.open('https://mercadolivre.com.br/loja/modelagem-e-diversos', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Entre em Contato
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tire suas dúvidas, conheça nossos moldes e cursos profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-card border-2 border-white/20 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary text-xl">
                <MessageCircle className="h-6 w-6" />
                WhatsApp Direto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Fale conosco diretamente pelo WhatsApp para:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Tirar dúvidas sobre conversão de arquivos</li>
                <li>• Conhecer nossos moldes digitais</li>
                <li>• Informações sobre cursos</li>
                <li>• Suporte técnico personalizado</li>
              </ul>
              <Button 
                onClick={openWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <Phone className="mr-2 h-4 w-4" />
                (35) 9 9812-1698
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card border-2 border-white/20 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary text-xl">
                <ShoppingBag className="h-6 w-6" />
                Loja Online
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Visite nossa loja online e descubra:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  <span className="text-sm">Moldes digitais a partir de R$ 7,99</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="text-sm">Curso de modelagem no Audaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-primary" />
                  <span className="text-sm">Moldes físicos e digitais</span>
                </div>
              </div>
              <Button 
                onClick={openWebsite}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                size="lg"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                MercadoLivre - Modelagem e Diversos
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">🌟 Por que escolher nossos serviços?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="font-semibold mb-2">✅ Qualidade Garantida</p>
                <p className="text-sm text-white/80">Moldes testados por profissionais</p>
              </div>
              <div>
                <p className="font-semibold mb-2">⚡ Entrega Rápida</p>
                <p className="text-sm text-white/80">Download imediato após compra</p>
              </div>
              <div>
                <p className="font-semibold mb-2">💬 Suporte Completo</p>
                <p className="text-sm text-white/80">Ajuda via WhatsApp</p>
              </div>
              <div>
                <p className="font-semibold mb-2">🎯 Preços Justos</p>
                <p className="text-sm text-white/80">A partir de apenas R$ 7,99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};