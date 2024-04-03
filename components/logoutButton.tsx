"use client";
import { logOut } from "@/lib/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <Button onClick={handleLogout} className="w-min  my-2">
      Sign Out
    </Button>
  );
}
