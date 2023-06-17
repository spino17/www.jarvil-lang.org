"use client";

import { DocsPageLayout } from "@/components/docs/layout";
import ReactMarkdown from "react-markdown";
import { CONTENT } from "./content";

export default function DocsEveryDayTypes() {
  return (
    <DocsPageLayout heading="Everyday Types">
      <ReactMarkdown>{CONTENT}</ReactMarkdown>
    </DocsPageLayout>
  );
}
