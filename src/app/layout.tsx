import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "niniasamani_art — ხელნაკეთი სტუდია",
  description: "უნიკალური ხელნაკეთი სამკაულები, ეპოქსიდის ნაკეთობები, ტექსტილის აქსესუარები და გადაკეთების სერვისი ოზურგეთში.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
