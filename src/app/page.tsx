import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="bg-yellow-300 text-black p-2 m-2 rounded-2xl">
        Saas setup working properly. click on these button to know more.
        </div>
        <Button>Click me</Button>
    </div>
  );
}
