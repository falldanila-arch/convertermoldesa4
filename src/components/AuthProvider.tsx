import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  hasAccess: boolean;
  checkAccess: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  hasAccess: false,
  checkAccess: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [hasAccess, setHasAccess] = useState(false);

  const checkAccess = async () => {
    try {
      const { data } = await supabase.functions.invoke('check-access');
      setHasAccess(data?.hasAccess || false);
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
      setHasAccess(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAccess();
          }, 0);
        } else {
          setHasAccess(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          checkAccess();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, hasAccess, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
};