import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SHEETS, SHEET_MAP } from "@/lib/data/roadmaps";
import { SheetView } from "./SheetView";
import type { SheetId } from "@/lib/types";

export function generateStaticParams() {
  return SHEETS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meta = SHEET_MAP[id as SheetId];
  return { title: meta ? meta.name : "Sheet" };
}

export default async function SheetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!SHEET_MAP[id as SheetId]) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <SheetView id={id as SheetId} />
    </div>
  );
}
