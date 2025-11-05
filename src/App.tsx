import { useEffect } from "react";
import RootRoute from "./root-route";
import supabase from "./lib/supabase";
import { useSetSession } from "./store/session";

export default function App() {
  const setSession = useSetSession();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return <RootRoute />;
}
