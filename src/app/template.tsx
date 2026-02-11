import { PageTransitionEffect } from "@/components/ui/page-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransitionEffect>{children}</PageTransitionEffect>;
}
