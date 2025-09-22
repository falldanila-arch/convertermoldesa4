-- Fix security issues by setting search_path for functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.user_has_access(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user has paid
  IF EXISTS (
    SELECT 1 FROM public.payments 
    WHERE user_id = $1 AND status = 'paid'
  ) THEN
    RETURN true;
  END IF;
  
  -- Check if user has valid voucher
  IF EXISTS (
    SELECT 1 FROM public.vouchers 
    WHERE user_id = $1 AND used_at IS NOT NULL AND expires_at > now()
  ) THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;