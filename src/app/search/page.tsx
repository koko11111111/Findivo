import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p className="text-zinc-500">Loading...</p></div>}>
      <SearchPageClient />
    </Suspense>
  );
}
