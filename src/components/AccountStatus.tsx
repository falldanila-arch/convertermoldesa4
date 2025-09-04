import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Crown, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { PaymentModal } from "./PaymentModal";

export const AccountStatus = () => {
  const { user, hasAccess, checkAccess } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao sair");
    } else {
      toast.success("Logout realizado com sucesso");
    }
  };

  const handleRefreshAccess = async () => {
    await checkAccess();
    toast.success("Status atualizado");
  };

  if (!user) return null;

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Minha Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Email:</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <Badge variant={hasAccess ? "default" : "secondary"} className="flex items-center gap-1">
              {hasAccess ? (
                <>
                  <Crown className="h-3 w-3" />
                  Premium
                </>
              ) : (
                "Gratuito"
              )}
            </Badge>
          </div>

          {hasAccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800 font-medium">
                ✅ Acesso completo liberado
              </p>
              <p className="text-xs text-green-600">
                Você pode usar todas as funcionalidades de conversão
              </p>
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800 font-medium">
                🔒 Acesso limitado
              </p>
              <p className="text-xs text-orange-600">
                Libere o acesso completo por apenas R$ 2,99
              </p>
            </div>
          )}

          <div className="flex gap-2">
            {!hasAccess && (
              <Button 
                onClick={() => setShowPaymentModal(true)}
                className="flex-1 bg-gradient-primary hover:opacity-90"
                size="sm"
              >
                <Gift className="mr-2 h-4 w-4" />
                Liberar Acesso
              </Button>
            )}
            
            <Button 
              onClick={handleRefreshAccess}
              variant="outline"
              size="sm"
            >
              Atualizar
            </Button>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </CardContent>
      </Card>

      <PaymentModal 
        open={showPaymentModal} 
        onOpenChange={setShowPaymentModal} 
      />
    </>
  );
};