// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// import { supabase } from "../lib/supabaseClient";

// const AuthContext = createContext(); // created context

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let subscription;
//     const initAuth = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setUser(session?.user ?? null);
//       setLoading(false);

//       const { data } = supabase.auth.onAuthStateChange((_event, session) => {
//         setUser(session?.user ?? null);
//       });
//       subscription = data?.subscription;
//       // return statement to unsubscribe
//     };
//     initAuth();
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   const value = useMemo(
//     () => ({
//       user,
//       signUp: (email, password) => supabase.auth.signUp({ email, password }),
//       signIn: (email, password) =>
//         supabase.auth.signInWithPassword({ email, password }),
//       signOut: () => supabase.auth.signOut(),
//     }),
//     [user]
//   );
//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// use Zustand for the same

import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  initAuth: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, loading: false });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
    return () => subscription.unsubscribe();
  },

  signUp: (email, password) => supabase.auth.signUp({ email, password }),
  signIn: (email, password) =>
    supabase.auth.signInWithPassword({ email, password }),

  signOut: () => supabase.auth.signOut(),
}));
