import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) throw new Error("Usuário não autenticado");

    // Verificar se voucher existe e é válido
    const { data: voucher, error: voucherError } = await supabaseClient
      .from("vouchers")
      .select("*")
      .eq("code", code)
      .is("user_id", null)
      .is("used_at", null)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (voucherError || !voucher) {
      throw new Error("Voucher inválido, já usado ou expirado");
    }

    // Usar voucher
    const { error: updateError } = await supabaseClient
      .from("vouchers")
      .update({
        user_id: user.id,
        used_at: new Date().toISOString()
      })
      .eq("id", voucher.id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true }), {
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