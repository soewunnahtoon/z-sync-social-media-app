import SearchResults from "@/components/search";
import Sidebar from "@/components/sidebar";

import { Metadata } from "next";

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ q: string }>;
}): Promise<Metadata> {
  const searchParams = await searchParamsPromise;
  const q = searchParams.q || "";

  return {
    title: `Search results for "${q}"`,
  };
}

export default async function Page({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const q = searchParams.q || "";

  return (
    <main className="flex w-full min-w-0 gap-2">
      <div className="w-full min-w-0 space-y-2">
        <div className="rounded-2xl bg-card p-2 shadow-sm">
          <h1 className="line-clamp-2 break-all text-center text-xl font-bold">
            Search results for &quot;{q}&quot;
          </h1>
        </div>

        <SearchResults query={q} />
      </div>

      <Sidebar />
    </main>
  );
}
