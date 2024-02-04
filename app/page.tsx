"use client";

import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.HOME);
  }, []);
  return <></>;
}
