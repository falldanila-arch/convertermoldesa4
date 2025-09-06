import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogIn, CreditCard, Ticket, CheckCircle, Gift } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface AccessTutorialProps {
  onShowAuth: () => void;
  onShowPayment: () => void;
}

export const AccessTutorial = ({ onShowAuth, onShowPayment }: AccessTutorialProps) => {
  const { user, hasAccess } = useAuth();

  if (hasAccess) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-green-700">
            <CheckCircle className="h-6 w-6" />
            <span className="font-semibold">Acesso liberado! Você pode converter seus PDFs.</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-br from-background via-background to-muted/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Como usar o conversor gratuitamente
        </CardTitle>
        <CardDescription>
          Siga um dos métodos abaixo para ter acesso gratuito ao conversor de PDF
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voucher Vitalício */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Ticket className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-amber-800">Voucher Gratuito Vitalício</h3>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">Limitado!</Badge>
          </div>
          <p className="text-sm text-amber-700 mb-3">
            Use o código <strong>GRATIS2025</strong> e tenha acesso vitalício e gratuito ao conversor!
          </p>
          <div className="bg-amber-100 p-2 rounded border-l-4 border-amber-400">
            <p className="text-xs text-amber-800">
              <strong>Código:</strong> GRATIS2025 • <strong>Válido:</strong> Para sempre • <strong>Usuários:</strong> Ilimitado
            </p>
          </div>
        </div>

        {/* Métodos de Acesso */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <LogIn className="h-4 w-4 text-primary" />
              1. Faça Login
            </h4>
            <p className="text-sm text-muted-foreground">
              {user ? "✅ Você já está logado!" : "Primeiro, você precisa criar uma conta ou fazer login"}
            </p>
            {!user && (
              <Button onClick={onShowAuth} variant="outline" size="sm">
                Fazer Login / Cadastrar
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              2. Escolha uma Opção
            </h4>
            <div className="space-y-2">
              <div className="text-sm">
                <p><strong>💳 Pagamento único:</strong> R$ 2,99</p>
                <p><strong>🎫 Voucher:</strong> GRATIS2025 (gratuito)</p>
              </div>
              {user && !hasAccess && (
                <Button onClick={onShowPayment} size="sm" className="w-full">
                  Liberar Acesso - R$ 2,99
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Como usar voucher */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Como usar o voucher:</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Faça login ou cadastre-se</li>
            <li>2. Clique em "Liberar Acesso"</li>
            <li>3. Escolha a opção "Tenho um voucher"</li>
            <li>4. Digite o código <strong>GRATIS2025</strong></li>
            <li>5. Pronto! Agora você pode converter PDFs gratuitamente</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};