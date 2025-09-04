import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Gerar código aleatório de voucher
function generateVoucherCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { adminKey, daysValid = 30 } = await req.json();

    // Verificar chave de admin (simples para este exemplo)
    const ADMIN_KEY = Deno.env.get("ADMIN_VOUCHER_KEY") || "admin2025";
    
    if (adminKey !== ADMIN_KEY) {
      throw new Error("Chave de administrador inválida");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const voucherCode = generateVoucherCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + daysValid);

    const { data, error } = await supabaseClient
      .from("vouchers")
      .insert({
        code: voucherCode,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ 
      voucher: data,
      message: `Voucher ${voucherCode} criado com validade até ${expiresAt.toLocaleDateString('pt-BR')}`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});