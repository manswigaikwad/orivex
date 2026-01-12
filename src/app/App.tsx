import { useEffect, useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { DeveloperSection } from "./components/DeveloperSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { CompletePackageSection } from "./components/CompletePackageSection";
import { InquiryFormSection } from "./components/InquiryFormSection";
import { ConversionSection } from "./components/ConversionSection";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[data-scroll-to]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const sectionId = anchor.getAttribute("data-scroll-to");
      if (!sectionId) return;
      const el = document.getElementById(sectionId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-950">
        <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-lg">
          <div className="app-gutter">
            <div className="flex h-16 items-center justify-between">
              <a
                href="#hero"
                data-scroll-to="hero"
                className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
                ORIVEX
              </a>
              <div className="hidden md:flex items-center gap-2">
                {[
                  { label: "Home", section: "hero" },
                  { label: "Services", section: "services" },
                  { label: "How It Works", section: "how-it-works" },
                  { label: "Developer", section: "developer" },
                  { label: "Portfolio", section: "portfolio" },
                  { label: "Contact", section: "inquiry-form" },
                ].map((item) => (
                  <Button
                    key={item.section}
                    size="sm"
                    variant="ghost"
                    asChild
                    className="text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <a href={`#${item.section}`} data-scroll-to={item.section}>
                      {item.label}
                    </a>
                  </Button>
                ))}
              </div>

              <div className="md:hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setIsMobileNavOpen((v) => !v)}
                  aria-label="Toggle navigation"
                >
                  {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </div>
            </div>

            {isMobileNavOpen && (
              <div className="md:hidden pb-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-lg p-2">
                  {[
                    { label: "Home", section: "hero" },
                    { label: "Services", section: "services" },
                    { label: "How It Works", section: "how-it-works" },
                    { label: "Developer", section: "developer" },
                    { label: "Portfolio", section: "portfolio" },
                    { label: "Contact", section: "inquiry-form" },
                  ].map((item) => (
                    <Button
                      key={item.section}
                      variant="ghost"
                      className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                      asChild
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <a href={`#${item.section}`} data-scroll-to={item.section}>
                        {item.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-16">
          <HeroSection />
          <ServicesSection />
          <HowItWorksSection />
          <DeveloperSection />
          <PortfolioSection />
          <TestimonialsSection />
          <FAQSection />
          <CompletePackageSection />
          <InquiryFormSection />
          <ConversionSection />
        </div>
      </div>
      <Toaster />
    </>
  );
}