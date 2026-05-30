"use client";

import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const userRole = authUser?.userRole.toLowerCase();
  const shouldRedirect =
    (userRole === "manager" && pathname.startsWith("/search")) ||
    (userRole === "manager" && pathname === "/");

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/manager/properties", { scroll: false });
    }
  }, [shouldRedirect, userRole, router]);

  if (authLoading || !authUser || shouldRedirect) return <>Loading...</>;
  if (!authUser?.userRole) return null;
  return (
    <div className="h-full w-full">
      <Navbar />

      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
