import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { StylePreview } from "@/components/ui/style-preview";
import { routing, type AppLocale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Design Foundation",
};

type StylePreviewPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function StylePreviewPage({
  params,
}: StylePreviewPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return <StylePreview locale={locale as AppLocale} />;
}
