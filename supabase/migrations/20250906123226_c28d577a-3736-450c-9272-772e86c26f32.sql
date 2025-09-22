-- Criar voucher vitalício e multiusuário
INSERT INTO public.vouchers (code, expires_at, user_id, used_at) 
VALUES ('GRATIS2025', '2099-12-31'::timestamp with time zone, NULL, NULL)
ON CONFLICT (code) DO NOTHING;