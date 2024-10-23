import { Loader2 } from "lucide-react";

export const LoaderOverlay = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-slate-600/60">
          <Loader2 size={200} className="animate-spin delay-200" />
        </div>
      )}
    </>
  );
};
