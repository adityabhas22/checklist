"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Custom useAuth that requests the 'convex' JWT template
  const useAuthForConvex = () => {
    const auth = useAuth();
    return {
      ...auth,
      getToken: async (options?: any) => {
        // Request the specific 'convex' JWT template
        return auth.getToken({ template: "convex", ...options });
      },
    };
  };

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuthForConvex}>
      {children}
    </ConvexProviderWithClerk>
  );
}
