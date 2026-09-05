import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/redux/provider";
import { CompareBar } from "@/components/property/compare-bar";
import { ChatWidget } from "@/components/dashboard/chat/chat-widget";

export const metadata: Metadata = {
  title: {
    default: "ListEasy BD — Your properties, organized.",
    template: "%s | ListEasy BD",
  },
  description:
    "A premium property catalog and lead platform for Bangladeshi real-estate agents. One professional link instead of twenty WhatsApp messages.",
  metadataBase: new URL("https://listeasy.example.com"),
  openGraph: {
    title: "ListEasy BD",
    description:
      "A premium property catalog and lead platform for Bangladeshi real-estate agents.",
    type: "website",
    locale: "en_BD",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <ReduxProvider>
          {children}
           <ChatWidget />
          <CompareBar />
          <Toaster position="bottom-right" richColors closeButton />
        </ReduxProvider>
      </body>
    </html>
  );
}
