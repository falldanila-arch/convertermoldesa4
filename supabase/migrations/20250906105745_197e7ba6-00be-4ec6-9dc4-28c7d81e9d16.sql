-- Corrigir função user_has_access para resolver ambiguidade de colunas
CREATE OR REPLACE FUNCTION public.user_has_access(user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if user has paid
  IF EXISTS (
    SELECT 1 FROM public.payments 
    WHERE payments.user_id = $1 AND status = 'paid'
  ) THEN
    RETURN true;
  END IF;
  
  -- Check if user has valid voucher
  IF EXISTS (
    SELECT 1 FROM public.vouchers 
    WHERE vouchers.user_id = $1 AND used_at IS NOT NULL AND expires_at > now()
  ) THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$function$