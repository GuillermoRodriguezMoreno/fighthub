import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-9xl font-black text-gray-200">402</h1>

        <p className="text-2xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
          Uh-oh!
        </p>

        <p>You dont have permission</p>

        <Button>
          <Link href="/" className="flex items-center gap-1">
            <HomeIcon className="" />
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  );
}
