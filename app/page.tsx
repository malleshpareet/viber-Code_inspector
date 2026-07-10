import { Button } from "@base-ui/react";
import Image from "next/image";
import { requiredAuth } from "@/module/auth/utils/auth-utils";
import Logout from "@/module/auth/components/logout";

export default async function Home() {
  await requiredAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logout>
        <Button render={<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity" />}>Logout</Button>
      </Logout>
    </div>
  );
}
