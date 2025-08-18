import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
      <Button
        size="sm"
        disabled
        className="
        max-w-[150px]
        bg-gradient-to-br from-blue-600 to-green-600 text-white flex items-center gap-2">
        <Loader2Icon className="animate-gradient-spin" />
        Please wait
      </Button>
      </div>
    </>
  );
}
