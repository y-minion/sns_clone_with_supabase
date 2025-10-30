import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { SunIcon } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full max-w-175 justify-between px-5">
          <Link className="flex items-center gap-2" to="/">
            <img className="h-5" src={logo} alt="한입 로그의 로고" />
            <div className="font-bold">한입 로그</div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img className="h-5" src={defaultAvatar} />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @milo
      </footer>
    </div>
  );
}
