import { Button } from "@base-ui/react";
import Image from "next/image";
import { requiredAuth } from "@/module/auth/utils/auth-utils";
import Logout from "@/module/auth/components/logout";
import { redirect } from "next/navigation";

export default async function Home() {
  await requiredAuth();
  return redirect("/dashboard");
}
