import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

export const Success = () => {
  const navigate = useNavigate();
  const { checkAccess } = useAuth();

  useEffect(() => {
    // Verificar acesso após retorno do Stripe
    const timer = setTimeout(() => {
      checkAccess();
      toast.success("Pagamento aprovado! Acesso liberado com sucesso!");
    }, 2000);

    return () => clearTimeout(timer);
  }, [checkAccess]);

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-card">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-primary">
            Pagamento Aprovado!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Seu pagamento foi processado com sucesso. Agora você tem acesso completo a todas as funcionalidades de conversão de PDF.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Acesso liberado para:</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Conversão de PDF para formato poster</li>
              <li>• Divisão automática em páginas A4</li>
              <li>• Preview com visualização de cortes</li>
              <li>• Downloads ilimitados</li>
            </ul>
          </div>

          <Button 
            onClick={() => navigate("/")}
            className="w-full bg-gradient-primary hover:opacity-90"
            size="lg"
          >
            <Home className="mr-2 h-4 w-4" />
            Voltar ao Conversor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};