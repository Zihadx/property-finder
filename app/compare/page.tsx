import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CompareContent } from "./compare-content";

export default function ComparePage() {
  return (
    <>
      <SiteHeader />
      <CompareContent />
      <SiteFooter />
    </>
  );
}
