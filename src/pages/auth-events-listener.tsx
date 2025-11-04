import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthEventListener() {
  const navigate = useNavigate();
  useEffect(() => {
    const { data: authListenr } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth Event:", event, session);
        if (event === "INITIAL_SESSION") {
          console.log("INITIAL_SESSION감지");
          navigate("/", { replace: true });
        } else if (event === "SIGNED_IN" && session) {
          console.log("✅ SIGNED_IN event detected, navigating to /");
          navigate("/", { replace: true });
        } else if (event === "SIGNED_OUT") {
          navigate("sign-in");
        }
      },
    );

    // 컴포넌트 언마운트 시 리스너 정리
    return authListenr.subscription.unsubscribe();
  }, [navigate]);
  return null;
}
