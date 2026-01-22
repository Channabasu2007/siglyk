"use client";

import { usePathname } from "next/navigation";

export function usePageName() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // root → home
  if (segments.length === 0) return "home";

  // last segment corresponds to page.js
  return segments[segments.length - 1];
}
