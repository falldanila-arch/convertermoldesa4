import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Gift, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "./AuthProvider";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentModal = ({ open, onOpenChange }: PaymentModalProps) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isVoucherLoading, setIsVoucherLoading] = useState(false);
  const { checkAccess } = useAuth();

  const handlePayment = async () => {
    setIsPaymentLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment');
      
      if (error) throw error;
      if (!data?.url) throw new Error("URL de pagamento não recebida");
      
      // Abrir Stripe em nova aba
      window.open(data.url, '_blank');
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar pagamento");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handleVoucher = async () => {
    if (!voucherCode.trim()) {
      toast.error("Digite um código de voucher");
      return;
    }

    setIsVoucherLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('use-voucher', {
        body: { code: voucherCode }
      });
      
      if (error) throw error;
      
      toast.success("Voucher aplicado com sucesso! Acesso liberado!");
      
      // Aguardar um pouco e verificar o acesso novamente
      setTimeout(async () => {
        await checkAccess();
        onOpenChange(false);
        setVoucherCode("");
      }, 500);
      
    } catch (error: any) {
      toast.error(error.message || "Erro ao usar voucher");
      setIsVoucherLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Liberação de Acesso
          </DialogTitle>
          <DialogDescription>
            Pague R$ 2,99 ou use um voucher para acessar todas as funcionalidades
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Pagamento */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">R$ 2,99</div>
              <p className="text-sm text-muted-foreground">
                Pagamento único para acesso completo
              </p>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={isPaymentLoading}
              size="lg"
            >
              {isPaymentLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pagar com Cartão
                </>
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Voucher */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-primary" />
              <Label htmlFor="voucher">Código do Voucher</Label>
            </div>
            
            <div className="flex gap-2">
              <Input
                id="voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="Digite o código"
                className="flex-1"
              />
              <Button 
                onClick={handleVoucher}
                disabled={isVoucherLoading || !voucherCode.trim()}
                variant="outline"
              >
                {isVoucherLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Usar"
                )}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Tem um voucher de gratuidade? Digite o código acima
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};