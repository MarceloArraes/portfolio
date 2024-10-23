"use client";

// import { LoaderOverlay } from "@/app/components/LoaderOverlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, Suspense, useState } from "react";

export function ReactQueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {/* <Suspense fallback={<LoaderOverlay isLoading={true} />}> */}
      {children}
      {/* </Suspense> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
